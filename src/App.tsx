import React, { useState } from 'react';
import { Plus, Trash2, Code, Smartphone, Download } from 'lucide-react';

type Object3D = {
  type: 'box' | 'sphere';
  position: string;
  color: string;
  rotation?: string;
  scale?: string;
  radius?: string;
};

function App() {
  const [objects, setObjects] = useState<Object3D[]>([]);
  const [newObject, setNewObject] = useState<Object3D>({
    type: 'box',
    position: '0 0.5 0',
    color: '#ff0000',
    rotation: '0 0 0',
    scale: '1 1 1'
  });

  const handleAddObject = (e: React.FormEvent) => {
    e.preventDefault();
    setObjects([...objects, newObject]);
    setNewObject({
      type: 'box',
      position: '0 0.5 0',
      color: '#ff0000',
      rotation: '0 0 0',
      scale: '1 1 1'
    });
  };

  const handleDeleteObject = (index: number) => {
    setObjects(objects.filter((_, i) => i !== index));
  };

  const handleViewAR = () => {
    const jsonOutput = {
      objects: objects.map(obj => ({
        ...obj,
        color: obj.color.replace('#', '')
      }))
    };
    localStorage.setItem('webar-scene', JSON.stringify(jsonOutput));
    window.open('/viewer.html', '_blank');
  };

  const handleExportJSON = () => {
    const jsonOutput = {
      objects: objects.map(obj => ({
        ...obj,
        color: obj.color.replace('#', '')
      }))
    };
    
    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scene.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const jsonOutput = {
    objects: objects.map(obj => ({
      ...obj,
      color: obj.color.replace('#', '')
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WebAR Object Editor</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Export JSON
            </button>
            <button
              onClick={handleViewAR}
              className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              <Smartphone size={20} />
              View in AR
            </button>
          </div>
        </div>
        
        {/* Add Object Form */}
        <form onSubmit={handleAddObject} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={newObject.type}
                onChange={(e) => setNewObject({
                  ...newObject,
                  type: e.target.value as 'box' | 'sphere'
                })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="box">Box</option>
                <option value="sphere">Sphere</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position (x y z)
              </label>
              <input
                type="text"
                value={newObject.position}
                onChange={(e) => setNewObject({
                  ...newObject,
                  position: e.target.value
                })}
                placeholder="0 0.5 0"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="color"
                value={newObject.color}
                onChange={(e) => setNewObject({
                  ...newObject,
                  color: e.target.value
                })}
                className="h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {newObject.type === 'box' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rotation (x y z)
                  </label>
                  <input
                    type="text"
                    value={newObject.rotation}
                    onChange={(e) => setNewObject({
                      ...newObject,
                      rotation: e.target.value
                    })}
                    placeholder="0 0 0"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scale (x y z)
                  </label>
                  <input
                    type="text"
                    value={newObject.scale}
                    onChange={(e) => setNewObject({
                      ...newObject,
                      scale: e.target.value
                    })}
                    placeholder="1 1 1"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Radius
                </label>
                <input
                  type="text"
                  value={newObject.radius || "0.5"}
                  onChange={(e) => setNewObject({
                    ...newObject,
                    radius: e.target.value
                  })}
                  placeholder="0.5"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Object
          </button>
        </form>

        {/* Objects List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Objects ({objects.length})</h2>
          <div className="space-y-4">
            {objects.map((obj, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div>
                  <span className="font-medium">{obj.type}</span>
                  <span className="mx-2">·</span>
                  <span className="text-gray-600">Position: {obj.position}</span>
                  <span className="mx-2">·</span>
                  <span className="text-gray-600">
                    Color: <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: obj.color }}></span>
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteObject(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {objects.length === 0 && (
              <p className="text-gray-500 text-center py-4">No objects added yet</p>
            )}
          </div>
        </div>

        {/* JSON Output */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code size={24} className="text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">JSON Output</h2>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;