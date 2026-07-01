import { Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { ProjectArticle } from '@/components/projects/show/project-article';
import { ProjectHero } from '@/components/projects/show/project-hero';
import type { ProjectDetail } from '@/types/projects';

type ProjectShowProps = {
    project: ProjectDetail;
};

export default function ProjectShow({ project }: ProjectShowProps) {
    return (
        <>
            <Head title={`${project.title} - KH Equipment Hub`} />
            <main className="min-h-screen bg-background font-public text-foreground">
                <ProjectHero project={project} nav={<PublicNav />} />
                <ProjectArticle project={project} />
                <Footer />
            </main>
        </>
    );
}
