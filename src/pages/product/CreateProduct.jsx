import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import toast from "react-hot-toast";
import { useQuery } from "../../hook/useQuery";
import { useStorage } from "../../hook/useStorage";
import { useCollection } from "../../hook/useCollection";

function CreateProduct() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [note, setNote] = useState("")
  const { removeFile, uploadFile } = useStorage()

  const { create, isLoading } = useCollection("product")

  const { data: categorys = [] } = useQuery("category", "", 1, 100);

  // ✅ handle image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // ✅ FIX HERE
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await uploadFile(image)
    const newDoc = await create({
      name,
      category,
      costPrice: Number(costPrice), // ប្តូរជាលេខ
      salePrice: Number(salePrice), // ប្តូរជាលេខ
      note,
      imageUrl: res?.file
    })
    if (newDoc) {
      toast.success(" create successFully")
      setImage(null)
      setName("")
      setCategory("")
      setCostPrice("")
      setSalePrice("")
      setNote("")
      setPreview(null)
      navigate("/product")
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">Creates new product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div className="space-y-4">
            <div>
              <label>Name*</label>
              <input
                type="text"
                required
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <select
              required
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>choose Category</option>
              {categorys.map((item) => (
                <option key={item?._id} value={item?._id}>
                  {item?.name}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4">

              <input
                type="number"
                required
                placeholder="Cost Price"
                className="input input-bordered w-full"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="Sale Price"
                className="input input-bordered w-full"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Note*</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-blue-500"
                placeholder="Enter product note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Link to="/product" className="btn btn-dark">Back</Link>
              <button className="btn btn-neutral">Save</button>
            </div>
          </div>

          {/* Upload */}
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center ">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />

            {preview ? (
              <img src={preview} alt="preview" className="max-h-full" />
            ) : (
              <p>Click to upload image</p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateProduct;