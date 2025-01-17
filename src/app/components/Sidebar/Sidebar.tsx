import React from 'react';
import {
    DocumentTextIcon,
    BookOpenIcon,
    ChartBarIcon,
    TagIcon,
    CogIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2">
                    <li>
                        <a
                            href="/notes"
                            className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <DocumentTextIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className="ml-3">Notes</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/books"
                            className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <BookOpenIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className="ml-3">Book Summaries</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/graph"
                            className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <ChartBarIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className="ml-3">Knowledge Graph</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/tags"
                            className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <TagIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className="ml-3">Tags</span>
                        </a>
                    </li>
                </ul>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/settings"
                                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <CogIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
