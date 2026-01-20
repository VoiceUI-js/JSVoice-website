import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | JSVoice',
    description: 'Insights, tutorials, and updates from the JSVoice team.',
};

export default function BlogIndexPage() {
    const posts = getAllPosts(['title', 'date', 'slug', 'author', 'description', 'tags']);

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Engineering <span className="text-[#CC5500]">Insights</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Deep dives into voice technology, browser APIs, and the future of web accessibility.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blogs/${post.slug}`}
                            className="group relative flex flex-col bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-[#CC5500]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#CC5500]/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#CC5500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="p-8 flex flex-col h-full relative z-10">
                                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <time dateTime={post.date}>{post.date}</time>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5" />
                                        <span>{post.author}</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#CC5500] transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                                    {post.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex gap-2">
                                        {post.tags && (post.tags as unknown as string[]).slice(0, 2).map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-wider text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-sm font-bold text-[#CC5500] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
