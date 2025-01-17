import React, { useState } from 'react';

export interface TextOverlay {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    position: 'top' | 'middle' | 'bottom';
    fontSize: number;
    color: string;
}

interface TextOverlayManagerProps {
    overlays: TextOverlay[];
    onOverlaysChange: (overlays: TextOverlay[]) => void;
    duration: number;
    currentTime: number;
}

const TextOverlayManager = ({ overlays, onOverlaysChange, duration, currentTime }: TextOverlayManagerProps) => {
    const [isAdding, _setIsAdding] = useState(false);

    const addOverlay = () => {
        const newOverlay: TextOverlay = {
            id: Date.now().toString(),
            text: '',
            startTime: currentTime,
            endTime: Math.min(currentTime + 5, duration),
            position: 'middle',
            fontSize: 24,
            color: '#ffffff'
        };
        onOverlaysChange([...overlays, newOverlay]);
        _setIsAdding(false);
    };

    const updateOverlay = (id: string, updates: Partial<TextOverlay>) => {
        onOverlaysChange(
            overlays.map(overlay => 
                overlay.id === id ? { ...overlay, ...updates } : overlay
            )
        );
    };

    const removeOverlay = (id: string) => {
        onOverlaysChange(overlays.filter(overlay => overlay.id !== id));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Text Overlays</h3>
                <button
                    onClick={addOverlay}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                        transition-colors duration-200 flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Text</span>
                </button>
            </div>

            <div className="space-y-4">
                {overlays.map((overlay) => (
                    <div 
                        key={overlay.id} 
                        className="bg-gray-50 rounded-lg p-4 space-y-3"
                    >
                        <div className="flex justify-between">
                            <input
                                type="text"
                                value={overlay.text}
                                onChange={(e) => updateOverlay(overlay.id, { text: e.target.value })}
                                placeholder="Enter text"
                                className="flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md 
                                    focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                onClick={() => removeOverlay(overlay.id)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Time (s)</label>
                                <input
                                    type="number"
                                    value={overlay.startTime}
                                    onChange={(e) => updateOverlay(overlay.id, { startTime: parseFloat(e.target.value) })}
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                        focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Time (s)</label>
                                <input
                                    type="number"
                                    value={overlay.endTime}
                                    onChange={(e) => updateOverlay(overlay.id, { endTime: parseFloat(e.target.value) })}
                                    min="0"
                                    max={duration}
                                    step="0.1"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                        focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position</label>
                                <select
                                    value={overlay.position}
                                    onChange={(e) => updateOverlay(overlay.id, { 
                                        position: e.target.value as TextOverlay['position'] 
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                        focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="top">Top</option>
                                    <option value="middle">Middle</option>
                                    <option value="bottom">Bottom</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Font Size</label>
                                <input
                                    type="number"
                                    value={overlay.fontSize}
                                    onChange={(e) => updateOverlay(overlay.id, { fontSize: parseInt(e.target.value) })}
                                    min="12"
                                    max="72"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                        focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Color</label>
                                <input
                                    type="color"
                                    value={overlay.color}
                                    onChange={(e) => updateOverlay(overlay.id, { color: e.target.value })}
                                    className="mt-1 block w-full h-10"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TextOverlayManager; 