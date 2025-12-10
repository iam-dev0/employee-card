'use client';

import { useState } from 'react';

const DynamicForm = ({ data, onChange }) => {
    const [newFieldLabel, setNewFieldLabel] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleCustomFieldAdd = () => {
        if (!newFieldLabel) return;
        const newField = { label: newFieldLabel, value: '' };
        onChange({
            ...data,
            customFields: [...(data.customFields || []), newField]
        });
        setNewFieldLabel('');
    };

    const handleCustomFieldChange = (index, value) => {
        const updatedFields = [...(data.customFields || [])];
        updatedFields[index].value = value;
        onChange({ ...data, customFields: updatedFields });
    };

    const handleCustomFieldRemove = (index) => {
        const updatedFields = (data.customFields || []).filter((_, i) => i !== index);
        onChange({ ...data, customFields: updatedFields });
    };

    return (
        <div className="space-y-6 p-6 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Edit Profile</h2>

            <div className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={data.firstName || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Kevin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={data.lastName || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Johnson"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Role / Title</label>
                    <input
                        type="text"
                        name="role"
                        value={data.role || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Marketing Manager"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={data.companyName || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Cool Co."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Profile Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={data.imageUrl || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={data.description || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        placeholder="Brief bio..."
                    />
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Contact Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={data.phone || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="kevin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={data.linkedin || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-zinc-500 mb-1">Website URL</label>
                            <input
                                type="url"
                                name="website"
                                value={data.website || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                {/* Custom Fields */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 uppercase tracking-wider">Custom Fields</h3>

                    <div className="space-y-3 mb-4">
                        {(data.customFields || []).map((field, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <div className="flex-1">
                                    <label className="block text-xs text-zinc-500 mb-1">{field.label}</label>
                                    <input
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => handleCustomFieldChange(idx, e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    onClick={() => handleCustomFieldRemove(idx)}
                                    className="mt-5 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFieldLabel}
                            onChange={(e) => setNewFieldLabel(e.target.value)}
                            placeholder="New field label (e.g. Location)"
                            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <button
                            onClick={handleCustomFieldAdd}
                            disabled={!newFieldLabel}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DynamicForm;
