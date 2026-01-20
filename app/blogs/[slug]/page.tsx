import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug, ['title', 'description']);

    if (!post) {
        return {
            title: 'Not Found',
        };
    }

    return {
        title: `${post.title} | JSVoice Blog`,
        description: post.description,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ['title', 'date', 'slug', 'author', 'content', 'tags']);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "JSVoice",
            "logo": {
                "@type": "ImageObject",
                "url": "https://jsvoice.dev/logo.png"
            }
        },
        "image": post.image ? `https://jsvoice.dev${post.image}` : "https://jsvoice.dev/og-image.png"
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/blogs"
                    className="inline-flex items-center text-gray-400 hover:text-[#CC5500] mb-8 transition-colors text-sm group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <article className="max-w-3xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 border-b border-white/10 pb-12">
                        <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-500 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#CC5500]" />
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#CC5500]" />
                                <span>{post.author}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        {post.tags && (
                            <div className="flex flex-wrap gap-2">
                                {(post.tags as unknown as string[]).map(tag => (
                                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                        <Tag className="w-3 h-3 mr-2 opacity-50" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-[#CC5500] prose-a:no-underline hover:prose-a:underline prose-code:text-[#CC5500] prose-code:bg-[#CC5500]/10 prose-code:rounded prose-code:px-1 prose-pre:bg-[#141414] prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-3xl mt-12 mb-6 text-white" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl mt-8 mb-4 text-white" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-gray-300" {...props} />,
                                ul: ({ node, ...props }) => <ul className="mb-6 space-y-2 list-disc list-inside text-gray-300" {...props} />,
                                li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                                strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
}
