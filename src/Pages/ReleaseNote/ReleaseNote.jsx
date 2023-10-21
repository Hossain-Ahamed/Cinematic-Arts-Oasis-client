import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ReleaseNote = () => {

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleTagDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = data => {
        console.log(tags)


        const dateTime = new Date(`${data?.date}T${data?.time}:00`)
        dateTime.setUTCHours(dateTime.getUTCHours() + 6);
        const iso = dateTime.toISOString();

        const formdata = new FormData();
        formdata.append('secret_key', data?.secret_key)
        formdata.append('header', data?.header)
        formdata.append('contributor', data?.contributor)
        formdata.append('time', iso);
        formdata.append('body',tags)

        formdata.forEach(i => console.log(i))
    }
    return (
        <div className='py-8 px-5'>
            <div className="relative z-0 w-full mb-6 px-3 border border-t-0 border-l-0 border-gray-200 shadow rounded ">
                <div className='flex flex-col items-start flex-wrap'>

                    {
                        tags.map((tag, index) => <div key={index} className="my-1 px-2 py-1   font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 ">{index+1}. {tag}
                            <button
                                onClick={() => handleTagDelete(index)}
                                className="ml-2 text-red-500 hover:text-red-600"
                            >
                                &#10005;
                            </button>
                        </div>)
                    }
                </div>
                <input type="text"
                    placeholder="Add a tag..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyPress}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  appearance-none  focus:outline-none focus:ring-0 " autoComplete="none" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" {...register("secret_key", { required: true })} id="secret-key" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"  placeholder=" " autoComplete='none' required/>
                    <label htmlFor="secret-key" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Secret Key</label>
                </div>

                <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative md:col-span-2 z-0 w-full mb-6 group">
                        <input type="text" {...register("header", { required: true })} id="header" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="header" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Header</label>
                    </div>
                    <div className="relative  z-0 w-full mb-6 group">
                        <input type="text"{...register("contributor", { required: true })} id="contributor" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="contributor" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contributor</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="date" {...register("date", { required: true })} id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="time" {...register("time", { required: true })} id="time" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="time" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Time</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>

        </div>
    );
};

export default ReleaseNote;