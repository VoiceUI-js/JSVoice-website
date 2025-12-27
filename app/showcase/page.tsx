import { ExternalLink, Github, Star } from 'lucide-react';

export default function ShowcasePage() {
    const projects = [
        {
            title: 'Voice Shopping Assistant',
            description: 'E-commerce platform with voice-powered product search and checkout',
            image: '/placeholder-project-1.jpg',
            tags: ['E-commerce', 'Accessibility'],
            demoUrl: '#',
            githubUrl: '#',
            featured: true,
        },
        {
            title: 'Smart Home Controller',
            description: 'Control your smart home devices using voice commands',
            image: '/placeholder-project-2.jpg',
            tags: ['Smart Home', 'IoT'],
            demoUrl: '#',
            githubUrl: '#',
            featured: true,
        },
        {
            title: 'Voice Notes App',
            description: 'Take notes hands-free with voice-to-text transcription',
            image: '/placeholder-project-3.jpg',
            tags: ['Productivity', 'Accessibility'],
            demoUrl: '#',
            githubUrl: '#',
            featured: false,
        },
        {
            title: 'Gaming Voice Commands',
            description: 'Add voice controls to your web-based games',
            image: '/placeholder-project-4.jpg',
            tags: ['Gaming', 'Entertainment'],
            demoUrl: '#',
            githubUrl: '#',
            featured: false,
        },
        {
            title: 'Accessibility Dashboard',
            description: 'Fully voice-controlled admin dashboard for accessibility',
            image: '/placeholder-project-5.jpg',
            tags: ['Accessibility', 'Dashboard'],
            demoUrl: '#',
            githubUrl: '#',
            featured: false,
        },
        {
            title: 'Voice Search Engine',
            description: 'Search the web using natural voice commands',
            image: '/placeholder-project-6.jpg',
            tags: ['Search', 'AI'],
            demoUrl: '#',
            githubUrl: '#',
            featured: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A]">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                        Showcase
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Amazing projects built with JSVoice by the community
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {['All', 'E-commerce', 'Accessibility', 'Gaming', 'Smart Home', 'Productivity'].map((filter) => (
                        <button
                            key={filter}
                            className={`px-4 py-2 rounded-lg transition-all ${filter === 'All'
                                ? 'gradient-orange text-white glow-orange'
                                : 'bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-300 hover:border-[#CC5500] hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl overflow-hidden hover:border-[#CC5500] hover:glow-orange hover:-translate-y-2 transition-all duration-300 group"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-gradient-dark overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-6xl">🎤</div>
                                </div>
                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full gradient-orange text-white text-xs font-semibold flex items-center space-x-1 glow-orange">
                                        <Star className="w-3 h-3" />
                                        <span>Featured</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Project Info */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-[#E67300] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm">{project.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-2 py-1 rounded text-xs bg-[#CC5500]/20 text-[#E67300] border border-[#CC5500]/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Built with Badge */}
                                <div className="pt-2 border-t border-[#CC5500]/20">
                                    <span className="text-xs text-gray-500">Built with JSVoice</span>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <a
                                        href={project.demoUrl}
                                        className="flex-1 px-4 py-2 rounded-lg gradient-orange text-white text-sm font-medium hover:glow-orange transition-all flex items-center justify-center space-x-1"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Live Demo</span>
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        className="px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white text-sm font-medium hover:border-[#CC5500] transition-all flex items-center justify-center"
                                        aria-label="GitHub"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Project CTA */}
                <div className="mt-16 text-center">
                    <div className="glass-strong rounded-2xl p-12 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Submit Your Project
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Built something amazing with JSVoice? Share it with the community!
                        </p>
                        <a
                            href="https://github.com/VoiceUI-js/VoiceUI/issues/new?template=showcase.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 rounded-lg gradient-orange text-white font-semibold text-lg hover:glow-orange transition-all"
                        >
                            Submit Your Project →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
