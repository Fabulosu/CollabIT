"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useClient } from '../../hooks/useClient'; // Import useClient hook
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Project {
    _id: string;
    project_logo: string;
    project_name: string;
    project_description: string;
    // Add more fields if necessary
}

const ExplorePage = () => {
    const { data: session, status } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const isClient = useClient(); // Determine if component is being rendered on the client side

    const router = useRouter();

    useEffect(() => {
        if (isClient) { // Check if component is being rendered on the client side
            const fetchProjects = async () => {
                try {
                    const response = await axios.get<Project[]>('/api/projects');
                    setProjects(response.data);
                } catch (error) {
                    console.error('Error fetching projects:', error);
                }
            };

            fetchProjects();
        }
    }, [isClient]); // Run useEffect only on client side

    if (status === 'loading') return <div>Loading...</div>;

    if (!session) return <div>You need to be logged in to access this page. Please <a href="/login">login</a>.</div>;

    const handleClick = (project_name: string) => {
        // console.log(project_name)
        router.push(`/explore/project/${project_name.replaceAll(" ", "-")}`);
    }

    return (
        <div className="bg-neutral-900 flex justify-center items-center h-full w-screen">
            <div className='grid grid-cols-3 justify-around'>
                {projects.map(project => (
                    <div key={project._id} className="h-40 w-3/4 flex justify-center items-center flex-col mt-40">
                        <img src={project.project_logo} width={64} />
                        <h2 className='font-bold text-xl text-white pt-4'>{project.project_name}</h2>
                        <p className='text-white'>{project.project_description}</p>
                        <Button onClick={() => handleClick(project.project_name)}>Show Project Page</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;