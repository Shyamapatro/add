import React, { useState,useEffect } from 'react';
import JoditEditor from "jodit-react";
import Layout from "../../components/Layout/Layout"
import { Button, Card, Text, TextInput } from "../../tailwind"
import toast from "react-hot-toast"
import { createPost } from '../../http';
import { useDispatch, useSelector } from "react-redux";

// 
import {fetchCategories} from "../../redux/slice​/categorySlice";
//   

const AddPost = () => {
    const [tegs, setTeg] = useState([])
    const [categories, setCategory] = useState([])
    const [defaultThumbnail, setDefaultThumbnail] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlfVZhBAsHKxFSXzDmAy-sJDae5_7KIzbK-oaB32DPrk2a1qm_C8pPKAif9-qsaVpae74&usqp=CAU');
    const [thumbnail, setThumbnail] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState(false);
    console.log(thumbnailFile)
    const [video, setVideo] = useState(false);
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [editSlug, setEditSlug] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { data: category }= useSelector((state) => state.category);
    // console.log("-----------------category", category[0].id )
  // Create Section
  const [sectionData, setSectionData] = useState([]);
  const dispatch = useDispatch();
  const categoryId= Object.values(sectionData);
console.log("===============categoryId",categoryId)
    // 
    useEffect(() => {
    
        dispatch(fetchCategories());
      }, []);
    //
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        seo_title: '',
        seo_metadata: '',
        type: 'article',
    tags: [],
    categories:[]

   
    });

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('seo_title', postData.seo_title);
        formData.append('seo_metadata', postData.seo_metadata);
        formData.append('type', postData.type);
        formData.append('thumbnail', thumbnailFile);
        formData.append('video', video);
        formData.append('slug', slug);
        for (let key of tegs.entries()) {
            formData.append('tegs', key[1])
        }
        // for (let key of categories.entries()) {
        //     formData.append('categories', key[1])
        // }
         formData.append('categories', categoryId);
        
        setLoading(true);
        if (postData.title === '') {
            toast.error('title is required')
            setLoading(false)
            return
        }
        if (postData.content === '') {
            toast.error('content is required')
            setLoading(false)
            return
        }
        if (!thumbnail) {
            toast.error('thumbnail is required')
            setLoading(false)
            return
        }
        if (postData.seo_title === '') {
            toast.error('seo title is required')
            setLoading(false)
            return
        }
        if (postData.seo_metadata === '') {
            toast.error('seo metadata is required')
            setLoading(false)
            return
        }
        try {
            const res = await createPost(formData)
            if (res.status === 200) {
                toast.success('post created successfully')
                setLoading(false)
            }
        } catch (err) {
            toast.error(err.response.data.message)
            setLoading(false)
        }



    }

    const headleTitle = (e) => {
        setPostData({ ...postData, title: e.target.value })
        const slugUrl = e.target.value.toLowerCase().split(' ').join('-');
        if (editSlug) {
            return;
        }
        setSlug(slugUrl)
    }

    const headleSlug = (e) => {
        const slugUrl = e.target.value.toLowerCase().split(' ').join('-');
        setSlug(slugUrl)
        setEditSlug(true)
        if (setEditSlug === false) {
            setHidden(!hidden)
        }

    }

    // Capture Thumbnail function
    function captureThumbnail(e) {
        const file = e.target.files[0];
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setThumbnail(reader.result);
        };
    }

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTeg([...tegs, e.target.value])
        e.target.value = ''
    }

    // Remove Teg
    function removeTag(index) {
        const newTeg = [...tegs]
        newTeg.splice(index, 1)
        setTeg(newTeg)
    }

    // headle categories
    function handleCategory(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setCategory([...categories, e.target.value])
        e.target.value = ''
    }
    // remove categories
    function removeCategory(index) {
        const newCategory = [...categories]
        newCategory.splice(index, 1)
        setCategory(newCategory)
    }
    return (
        <div className="flex justify-center w-auto">
            <div className="2xl:container w-full flex">
                <Layout>
                    <Text title={'Add a New Post'} />
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={event => {
                            if (event.key === 'Enter' /* Enter */) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <div className="grid grid-cols-3 mt-5">

                            <div className="flex col-span-2">
                                <div className="w-full">
                                    <TextInput
                                        placeholder="Title"
                                        type="text"
                                        value={postData.title}
                                        onChange={headleTitle}
                                    />
                                    <input type="checkbox" id="my-modal-5" class="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box w-11/12 max-w-5xl">
                                            <h3 className="font-bold text-lg">Post URL edit!</h3>
                                            <div className='py-4'>
                                                <TextInput
                                                    placeholder="Post URL"
                                                    value={slug}
                                                    onChange={headleSlug}
                                                />
                                            </div>
                                            <div className="modal-action">
                                                <label htmlFor="my-modal-5" className="btn">ok!</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-3 w-full'>
                                        <div className='flex flex-wrap'>
                                            <label htmlFor="my-modal-5" className="opacity-70 tracking-wide inline-block cursor-pointer font-medium">{`Slug: ${process.env.REACT_APP_APP_URL}/${postData.type}/${slug}`}</label>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <JoditEditor
                                            config={{
                                                height: 600,
                                                Image: {
                                                    insertImageAsBase64URI: true,
                                                    isShowFileName: true,
                                                }
                                            }}
                                            value={postData.content}
                                            onBlur={(newContent) => setPostData({ ...postData, content: newContent })}
                                        />
                                    </div>
                                    <div className='mt-5'>
                                        <Text title={'SEO'} />
                                        <TextInput
                                            placeholder="SEO Title"
                                            type="text"
                                            value={postData.seo_title}
                                            onChange={(e) => setPostData({ ...postData, seo_title: e.target.value })}
                                        />
                                        <TextInput
                                            placeholder="SEO Metadata"
                                            inputType="textarea" // Pass input text and textarea only
                                            cols="30"
                                            rows="5"
                                            marginVertical={'my-8'} // Pass only tailwind class
                                            onChange={(e) => setPostData({ ...postData, seo_metadata: e.target.value })}
                                        >
                                            {postData.seo_metadata}
                                        </TextInput>
                                    </div>

                                </div>
                            </div>
                            <div className='px-5'>
                                <Text
                                    title={'Thumbnail'}
                                    textStyle={'text-xl opacity-60 my-2'} // Pass only tailwind class
                                />
                                <div className='bg-white shadow-gray-500 border-2 shadow-md w-full h-52'>
                                    <input
                                        onChange={captureThumbnail}
                                        accept="image/*"
                                        id="thumbnail"
                                        type="file"
                                        name="thumbnail"
                                        className='hidden'
                                    />
                                    <label htmlFor="thumbnail">
                                        <img
                                            className='object-cover w-full h-full shadow-gray-500 border-2 drop-shadow-2xl'
                                            src={thumbnail ? thumbnail : defaultThumbnail}
                                            alt="thumbnail"
                                        />
                                    </label>
                                </div>

                                <div className='mt-8'>
                                    <Card
                                        title={<Text
                                            title={'Publish'}
                                            textStyle={'text-base font-bold opacity-60'}
                                        />}>
                                        <div className='grid grid-cols-2'>
                                            <div>
                                                <div className='flex'>
                                                    <input
                                                        type="radio"
                                                        id="article"
                                                        name="type"
                                                        value="article"
                                                        className='w-6 h-6'
                                                        onChange={(e) => setPostData({ ...postData, type: e.target.value })}
                                                        checked={postData.type === 'article'}
                                                    />
                                                    <label className='ml-2 text-base font-semibold' htmlFor="article">Article</label>
                                                </div>
                                                <div className='flex mt-4'>
                                                    <input
                                                        type="radio"
                                                        id="video"
                                                        name="type"
                                                        value="video"
                                                        className='w-6 h-6'
                                                        checked={postData.type === 'video'}
                                                        onChange={(e) => setPostData({ ...postData, type: e.target.value })}
                                                    />
                                                    <label className='ml-2 text-base font-semibold ' htmlFor="video">Video</label>
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    title={'Upload'}
                                                    uppercase={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <Button
                                                title={'Publish'}
                                                uppercase={true}
                                                // onClick={(e) => handleSubmit(e)}
                                                loading={loading}
                                            />
                                        </div>

                                    </Card>
                                </div>

                                <div className='mt-8'>
                                    <Text
                                        title={'Categories'}
                                        textStyle={'text-xl opacity-60 my-2'} // Pass only tailwind class
                                    />
                                    <Card>
                                        {/* <div className='flex gap-1'>
                                            <input
                                                className='w-full h-6 p-5 py-6 bg-secondary-blue focus:outline-none text-white rounded-full text-lg font-normal'
                                                type="text"
                                                name="categories"
                                                placeholder='Add categories'
                                                onKeyDown={handleCategory}
                                            />
                                        </div> */}
                                           <select
                    class="select select-bordered w-full bg-white-200 text-gray-900 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white shadow text-base mb-5"
                    value={category.value}
                    onChange={(e) =>
                        setSectionData({
                          ...sectionData,
                          category: e.target.value,
                        })
                      }
                  >
                    <option selected>Select a category</option>
                    {category.length > 0 &&
                      category.map((item) => {
                        // console.log("----------------item",item.id)
                        return <option value={item.title}>{item.title}</option>;
                      })}
                  </select>
                                        {/* <div>
                                            <div className={`rounded-md px-2 ${categories.length > 0 && 'm-2'} flex items-center flex-wrap gap-3`}>
                                                {
                                                    categories.map((category, index) => {
                                                        return (
                                                            <div key={index} className="bg-secondary-blue py-1 px-3 rounded-2xl flex items-center">
                                                                <span className="text-white">{category}</span>
                                                                <span onClick={() => removeCategory(index)} className="ml-2 cursor-pointer">
                                                                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="5" cy="5" r="5" fill="white" />
                                                                        <path d="M7 3.7275L6.2725 3L5 4.2725L3.7275 3L3 3.7275L4.2725 5L3 6.2725L3.7275 7L5 5.7275L6.2725 7L7 6.2725L5.7275 5L7 3.7275Z" fill="#1A237E" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div> */}
                                    </Card>
                                </div>

                                <div className='mt-8'>
                                    <Text
                                        title={'Tegs'}
                                        textStyle={'text-xl opacity-60 my-2'} // Pass only tailwind class
                                    />
                                    <Card>
                                        <div className='flex gap-1'>
                                            <input
                                                className='w-full h-6 p-5 py-6 bg-secondary-blue focus:outline-none text-white rounded-full text-lg font-normal'
                                                type="text"
                                                name="tags"
                                                placeholder='Add Tegs'
                                                onKeyDown={handleKeyDown}
                                            />
                                        </div>
                                        <div>
                                            <div className={`rounded-md px-2 ${tegs.length > 0 && 'm-2'} flex items-center flex-wrap gap-3`}>
                                                {
                                                    tegs.map((tegs, index) => {
                                                        return (
                                                            <div key={index} className="bg-secondary-blue py-1 px-3 rounded-2xl flex items-center">
                                                                <span className="text-white">{tegs}</span>
                                                                <span onClick={() => removeTag(index)} className="ml-2 cursor-pointer">
                                                                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle cx="5" cy="5" r="5" fill="white" />
                                                                        <path d="M7 3.7275L6.2725 3L5 4.2725L3.7275 3L3 3.7275L4.2725 5L3 6.2725L3.7275 7L5 5.7275L6.2725 7L7 6.2725L5.7275 5L7 3.7275Z" fill="#1A237E" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                        </div>
                    </form>
                </Layout>
            </div>
        </div>
    )
}

export default AddPost