import { useState, useEffect, useRef } from "react";
import type { DownloadableFile } from "../../services/api";
import {
  apiGetFiles,
  apiAddFile,
  apiUpdateFile,
  apiDeleteFile,
  apiUploadFile,
} from "../../services/api";

const FORM_CATEGORIES = ["Engineering", "Civil Registry"];
const ORDINANCE_CATEGORIES = [
  "Administrative",
  "Agriculture & Fisheries",
  "Environmental",
  "Health & Sanitation",
  "Infrastructure",
  "Social Welfare",
  "Tax & Revenue",
];

const ICON_OPTIONS = [
  { value: "fa-file-pdf", label: "PDF" },
  { value: "fa-file-alt", label: "Document" },
  { value: "fa-file-contract", label: "Contract" },
  { value: "fa-file-signature", label: "Signature" },
  { value: "fa-file-invoice", label: "Invoice" },
  { value: "fa-gavel", label: "Gavel" },
  { value: "fa-landmark", label: "Landmark" },
  { value: "fa-scroll", label: "Scroll" },
];

type Tab = "form" | "ordinance";

const AdminFiles = () => {
  const [activeTab, setActiveTab] = useState<Tab>("form");
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Add form state
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIcon, setNewIcon] = useState("fa-file-pdf");
  const [newResolutionNo, setNewResolutionNo] = useState("");
  const [newOrdinanceNo, setNewOrdinanceNo] = useState("");
  const [newYear, setNewYear] = useState<number | "">(new Date().getFullYear());

  // Edit form state
  const [editForm, setEditForm] = useState<{
    title: string;
    category: string;
    description: string;
    icon: string;
    resolution_no: string;
    ordinance_no: string;
    year: number | "";
  }>({
    title: "",
    category: "",
    description: "",
    icon: "",
    resolution_no: "",
    ordinance_no: "",
    year: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFiles();
  }, [activeTab]);

  async function loadFiles() {
    setLoading(true);
    try {
      const res = await apiGetFiles(activeTab);
      setFiles(res.data ?? []);
    } catch {
      setError("Failed to load files.");
    } finally {
      setLoading(false);
    }
  }

  const resetAddForm = () => {
    setNewFile(null);
    setNewTitle("");
    setNewCategory("");
    setNewDescription("");
    setNewIcon("fa-file-pdf");
    setNewResolutionNo("");
    setNewOrdinanceNo("");
    setNewYear(new Date().getFullYear());
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    if (!newFile || !newTitle.trim()) {
      setError("Please select a file and enter a title.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadType = activeTab === "form" ? "forms" : "ordinances";
      const uploadRes = await apiUploadFile(newFile, uploadType as "forms" | "ordinances");

      if (uploadRes.error) {
        setError(`Upload failed: ${uploadRes.error}`);
        setUploading(false);
        return;
      }

      const fileData: Parameters<typeof apiAddFile>[0] = {
        type: activeTab,
        title: newTitle.trim(),
        filename: uploadRes.filename!,
        original_name: uploadRes.original_name!,
        category:
          newCategory ||
          (activeTab === "form" ? FORM_CATEGORIES[0] : ORDINANCE_CATEGORIES[0]),
        description: newDescription.trim(),
        icon: newIcon,
      };

      if (activeTab === "ordinance") {
        fileData.resolution_no = newResolutionNo.trim();
        fileData.ordinance_no = newOrdinanceNo.trim();
        if (newYear) fileData.year = Number(newYear);
      }

      await apiAddFile(fileData);
      await loadFiles();
      resetAddForm();
    } catch {
      setError("Failed to add file.");
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (file: DownloadableFile) => {
    setEditingId(file.id);
    setEditForm({
      title: file.title,
      category: file.category,
      description: file.description || "",
      icon: file.icon || "fa-file-pdf",
      resolution_no: file.resolution_no || "",
      ordinance_no: file.ordinance_no || "",
      year: file.year || "",
    });
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    try {
      const updateData: Record<string, unknown> = {
        title: editForm.title,
        category: editForm.category,
        description: editForm.description,
        icon: editForm.icon,
      };
      if (activeTab === "ordinance") {
        updateData.resolution_no = editForm.resolution_no;
        updateData.ordinance_no = editForm.ordinance_no;
        updateData.year = editForm.year || null;
      }
      await apiUpdateFile(editingId, updateData);
      await loadFiles();
      setEditingId(null);
    } catch {
      setError("Failed to update file.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiDeleteFile(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      setDeleteConfirm(null);
    } catch {
      setError("Failed to delete file.");
    }
  };

  const categories =
    activeTab === "form" ? FORM_CATEGORIES : ORDINANCE_CATEGORIES;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["form", "ordinance"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowAddForm(false);
              setEditingId(null);
              setDeleteConfirm(null);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i
              className={`fas ${tab === "form" ? "fa-file-alt" : "fa-gavel"} mr-2`}
            ></i>
            {tab === "form" ? "Forms" : "Ordinances"}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {activeTab === "form" ? "Downloadable Forms" : "Ordinances"}
          </h3>
          <p className="text-sm text-gray-500">{files.length} files</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <i className="fas fa-plus"></i>
          Add {activeTab === "form" ? "Form" : "Ordinance"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-sm text-red-700">
          <i className="fas fa-exclamation-circle"></i>
          <span className="flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h4 className="font-semibold text-gray-800">
            Add New {activeTab === "form" ? "Form" : "Ordinance"}
          </h4>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF File
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors duration-200"
            >
              {newFile ? (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <i className="fas fa-file-pdf text-red-500"></i>
                  <span>{newFile.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewFile(null);
                    }}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <>
                  <i className="fas fa-file-upload text-2xl text-gray-400 mb-1"></i>
                  <p className="text-sm text-gray-600">
                    Click to select a PDF file
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={newCategory || categories[0]}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Brief description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
            />
          </div>

          {/* Ordinance-specific fields */}
          {activeTab === "ordinance" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resolution No.
                </label>
                <input
                  type="text"
                  value={newResolutionNo}
                  onChange={(e) => setNewResolutionNo(e.target.value)}
                  placeholder="e.g. 01-2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordinance No.
                </label>
                <input
                  type="text"
                  value={newOrdinanceNo}
                  onChange={(e) => setNewOrdinanceNo(e.target.value)}
                  placeholder="e.g. 01-2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) =>
                    setNewYear(e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder="2024"
                  min={2000}
                  max={2100}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={uploading || !newFile || !newTitle.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i> Add{" "}
                  {activeTab === "form" ? "Form" : "Ordinance"}
                </>
              )}
            </button>
            <button
              onClick={resetAddForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Files Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <i className="fas fa-file-alt text-4xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No {activeTab === "form" ? "forms" : "ordinances"} found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  {activeTab === "ordinance" && (
                    <>
                      <th className="px-4 py-3 font-medium">Ordinance No.</th>
                      <th className="px-4 py-3 font-medium">Year</th>
                    </>
                  )}
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {files.map((file) =>
                  editingId === file.id ? (
                    <tr key={file.id} className="bg-blue-50/50">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </td>
                      {activeTab === "ordinance" && (
                        <>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={editForm.ordinance_no}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  ordinance_no: e.target.value,
                                }))
                              }
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editForm.year}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  year: e.target.value
                                    ? Number(e.target.value)
                                    : "",
                                }))
                              }
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                            />
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 bg-primary text-white rounded text-xs cursor-pointer hover:bg-primary-hover"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs cursor-pointer hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <i
                            className={`fas ${file.icon || "fa-file-pdf"} text-red-500`}
                          ></i>
                          <span className="font-medium text-gray-800">
                            {file.title}
                          </span>
                        </div>
                        {file.description && (
                          <p className="text-xs text-gray-400 mt-0.5 ml-6">
                            {file.description}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {file.category}
                      </td>
                      {activeTab === "ordinance" && (
                        <>
                          <td className="px-4 py-3 text-gray-600">
                            {file.ordinance_no || "-"}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {file.year || "-"}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <a
                            href={`/${file.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-gray-700"
                            title="Preview"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                          <button
                            onClick={() => startEdit(file)}
                            className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          {deleteConfirm === file.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(file.id)}
                                className="text-xs text-red-600 font-medium cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-xs text-gray-500 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(file.id)}
                              className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFiles;
