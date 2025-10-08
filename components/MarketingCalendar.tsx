import React from 'react';
import type { ScheduledPost, SocialPlatform, PostStatus } from '../types';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';

interface MarketingCalendarProps {
    posts: ScheduledPost[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const platformIcons: Record<SocialPlatform, React.FC<React.SVGProps<SVGSVGElement>>> = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    LinkedIn: LinkedInIcon,
    Twitter: TwitterIcon,
};

const statusColors: Record<PostStatus, string> = {
    Scheduled: 'bg-blue-100 text-blue-800',
    Posted: 'bg-green-100 text-green-800',
    Draft: 'bg-gray-100 text-gray-800',
};

const PostCard: React.FC<{ post: ScheduledPost }> = ({ post }) => {
    const PlatformIcon = platformIcons[post.platform];
    return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden transition-shadow hover:shadow-md">
            <img src={post.image} alt="Post visual" className="w-full h-24 object-cover" />
            <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                        <PlatformIcon className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-800">{post.platform}</span>
                    </div>
                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[post.status]}`}>
                        {post.status}
                    </span>
                </div>
                <p className="text-sm text-gray-600">{post.content}</p>
            </div>
        </div>
    );
};

const MarketingCalendar: React.FC<MarketingCalendarProps> = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 bg-white p-4 rounded-lg shadow-sm">
            {daysOfWeek.map(day => {
                const postsForDay = posts.filter(p => p.day === day);
                return (
                    <div key={day} className="bg-gray-50 p-3 rounded-lg min-h-[200px]">
                        <h3 className="font-semibold text-center text-gray-700 mb-3 pb-2 border-b">{day}</h3>
                        <div className="space-y-3">
                            {postsForDay.length > 0 ? (
                                postsForDay.map(post => <PostCard key={post.id} post={post} />)
                            ) : (
                                <div className="text-center text-xs text-gray-400 pt-4">No posts</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MarketingCalendar;