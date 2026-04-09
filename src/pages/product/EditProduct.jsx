import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";
import toast from "react-hot-toast";
import { useQuery } from "../../hook/useQuery";
import { useStorage } from "../../hook/useStorage";
import { useCollection } from "../../hook/useCollection";
import { useFindByid } from "../../hook/useFindById";

function EditProduct() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [oldImage, setOldImage] = useState(null)
  const [note, setNote] = useState("")
  const { removeFile, uploadFile } = useStorage()
  const { isLoading, update } = useCollection("product")

  const route = useParams()

  const { data: product, isLoading: isFinding } = useFindByid("product", route.id)
  console.log(product)
  const { data: categorys = [] } = useQuery("category", "", 1, 100);

  // ✅ handle image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // ✅ FIX HERE
      setPreview(URL.createObjectURL(file));
    }
  };
  // ✅ បន្ថែម Function នេះនៅខាងលើ handleSubmit
  const handleClearImage = () => {
    setImage(null);    // លុប File ចេញពី State
    setPreview(null);  // លុបរូបភាព Preview ចេញពីអេក្រង់

    // បើអ្នកចង់ឱ្យវាបង្ហាញរូបភាពចាស់ពី Database ឡើងវិញ ក្រោយពេលចុច X
    if (oldImage) {
      setPreview(`http://localhost:8000/upload/${oldImage}`);
    }
  };
  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      category,
      costPrice,
      salePrice,
      note
    }

    if (image) {
      const res = await uploadFile(image)
      data['imageUrl'] = res?.file

      if (oldImage && oldImage !== "undefined") {
        await removeFile(oldImage);
      }


    } else {
      // បើមិនប្ដូររូបទេ ប្រើរូបដដែល
      data['imageUrl'] = oldImage;
    }
    const updateDoc = await update(data, route.id)
    if (updateDoc) {
      toast.success("update successFully")
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
  useEffect(() => {
    if (product && isFinding == false) {
      console.log("not see or see item product", product)
      setName(product?.name || "")
      setCategory(product?.category._id || "")
      setCostPrice(product?.costPrice || "")
      setSalePrice(product?.salePrice || "")
      setNote(product?.note || "")
      if (product?.imageUrl) {
        setPreview(`http://localhost:8000/upload/${product?.imageUrl}`)
        setOldImage(product?.oldImage)
      }
    }
  }, [product, isFinding])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">Edit new product</h2>

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

          {/* ផ្នែក Preview រូបភាព */}
          <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">

            {preview ? (
              <div className="relative w-full h-full p-2">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-contain rounded-lg"
                />

                {/* ប៊ូតុង X ពណ៌ក្រហម */}
                <button
                  type="button" // សំខាន់៖ កុំឱ្យវាច្រឡំ Submit Form
                  onClick={handleClearImage}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all z-30"
                >
                  <span className="text-xl font-bold">×</span>
                </button>
              </div>
            ) : (
              <div className="text-center transition-all">
                <p className="text-gray-400">Click to upload new picture</p>
              </div>
            )}

            {/* Input សម្រាប់រើសរូប (លាក់ទុកនៅពីក្រោមប៊ូតុង X) */}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              onChange={handleImageChange}
            />
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;