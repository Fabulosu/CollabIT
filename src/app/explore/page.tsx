"use client"
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useClient } from '../../hooks/useClient'; // Import useClient hook

interface Project {
    _id: string;
    project_name: string;
    project_description: string;
    // Add more fields if necessary
}

const ExplorePage = () => {
    const { data: session, status } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const isClient = useClient(); // Determine if component is being rendered on the client side

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

    return (
        <div className="grid-container">
            {projects.map(project => (
                <div key={project._id} className="project-card">
                    <h2>{project.project_name}</h2>
                    <p>{project.project_description}</p>
                </div>
            ))}
        </div>
    );
};

export default ExplorePage;