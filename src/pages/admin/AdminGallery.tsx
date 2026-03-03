import { useState, useEffect, useRef, useCallback } from "react";
import type { GalleryImage } from "../../services/api";
import {
  apiGetGallery,
  apiAddGallery,
  apiUpdateGallery,
  apiDeleteGallery,
  apiUploadFile,
} from "../../services/api";

const CATEGORIES = [
  "Events",
  "Infrastructure",
  "Nature & Tourism",
  "Culture & Heritage",
  "Community Programs",
  "Officials & Meetings",
];

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ caption: "", category: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const res = await apiGetGallery();
      setImages(res.data ?? []);
    } catch {
      setError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  }

  const filteredImages =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  // File selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type),
    );
    if (valid.length !== files.length) {
      setError("Only JPG, PNG, and WebP images are allowed.");
    }
    setUploadFiles((prev) => [...prev, ...valid]);
    if (!showUploadForm && valid.length > 0) setShowUploadForm(true);
  };

  // Drag & drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  // Upload
  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    setUploading(true);
    setError(null);

    let successCount = 0;
    for (const file of uploadFiles) {
      try {
        const uploadRes = await apiUploadFile(file, "gallery");
        if (uploadRes.error) {
          setError(`Upload failed for ${file.name}: ${uploadRes.error}`);
          continue;
        }
        await apiAddGallery({
          filename: uploadRes.filename!,
          original_name: uploadRes.original_name!,
          category: uploadCategory,
          caption: uploadCaption,
        });
        successCount++;
      } catch {
        setError(`Upload failed for ${file.name}.`);
      }
    }

    if (successCount > 0) {
      await loadImages();
      setUploadFiles([]);
      setUploadCaption("");
      setShowUploadForm(false);
    }
    setUploading(false);
  };

  // Edit
  const startEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditForm({ caption: img.caption, category: img.category });
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    try {
      await apiUpdateGallery(editingId, editForm);
      setImages((prev) =>
        prev.map((img) =>
          img.id === editingId ? { ...img, ...editForm } : img,
        ),
      );
      setEditingId(null);
    } catch {
      setError("Failed to update image.");
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      await apiDeleteGallery(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete image.");
    }
  };

  const removeUploadFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Gallery Images
          </h3>
          <p className="text-sm text-gray-500">{images.length} total images</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <i className="fas fa-cloud-upload-alt"></i>
          Upload Images
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-sm text-red-700">
          <i className="fas fa-exclamation-circle"></i>
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 cursor-pointer">
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h4 className="font-semibold text-gray-800">Upload New Images</h4>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-600">
              Drag & drop images here, or{" "}
              <span className="text-primary font-medium">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, WebP accepted
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {/* Selected Files */}
          {uploadFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {uploadFiles.length} file(s) selected
              </p>
              <div className="flex flex-wrap gap-2">
                {uploadFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <i className="fas fa-image text-gray-400"></i>
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button
                      onClick={() => removeUploadFile(i)}
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category & Caption */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption (optional)
              </label>
              <input
                type="text"
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                placeholder="Enter caption for all images"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex gap-3">
            <button
              onClick={handleUpload}
              disabled={uploading || uploadFiles.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload"></i> Upload{" "}
                  {uploadFiles.length > 0 && `(${uploadFiles.length})`}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setShowUploadForm(false);
                setUploadFiles([]);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              filter === cat
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-70">
              (
              {cat === "All"
                ? images.length
                : images.filter((img) => img.category === cat).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <i className="fas fa-images text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No images found</p>
          <p className="text-sm text-gray-400 mt-1">
            {filter !== "All"
              ? `No images in "${filter}" category`
              : "Upload some images to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden group relative"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={`/uploads/gallery/${img.filename}`}
                  alt={img.caption || img.original_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Edit overlay */}
              {editingId === img.id ? (
                <div className="p-3 space-y-2">
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={editForm.caption}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        caption: e.target.value,
                      }))
                    }
                    placeholder="Caption"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-2 py-1 bg-primary text-white rounded text-xs cursor-pointer hover:bg-primary-hover"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs cursor-pointer hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-800 truncate">
                    {img.caption || img.original_name}
                  </p>
                  <p className="text-xs text-gray-400">{img.category}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(img)}
                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <i className="fas fa-edit mr-1"></i>Edit
                    </button>
                    {deleteConfirm === img.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(img.id)}
                        className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <i className="fas fa-trash mr-1"></i>Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
