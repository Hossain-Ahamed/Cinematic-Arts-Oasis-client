import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from 'react-query';
const Carousel = () => {



    const axiosSecure = useAxiosSecure();
    const { refetch, data: dataList = [], isLoading: queryLoading, error: queryError } = useQuery({
        queryKey: ['caourselImage'],

        queryFn: async () => {
            const res = await axiosSecure.get(`/get-home-carouel`);
            // console.log(res.data)
            return res?.data?.dataList;
        },
    });



    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            draggable={false}
            loop={true}

            modules={[Pagination, Autoplay, Navigation]}
        >
            {
                dataList.map((item, _idx) => <SwiperSlide key={_idx}>
                    <img src={item?.image} alt="" className='w-screen h-[250px] md:w-[768px] md:h-[400px] lg:w-[1500px] lg:h-[500px] object-cover' />
                </SwiperSlide>)
            }



        </Swiper>
    );
};

export default Carousel;

