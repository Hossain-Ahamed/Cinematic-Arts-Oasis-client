import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useProfile from '../../../../Hooks/useProfile';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../../../LoadingPage/LoadingPage/LoadingPage';
import Swal from 'sweetalert2';
import SetTitle from '../../../Shared/SetTtitle/SetTitle';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import CourseData_AdminInstructorClassDetailView from './CourseData_AdminInstructorClassDetailView';
import StudentCard_AdminInstructorClassDetailView from './StudentCard_AdminInstructorClassDetailView';

const AdminInstructorClassDetailView = () => {
    const axiosSecure = useAxiosSecure();
    const { classID } = useParams();
    const { profileLoading, profile, role } = useProfile();
    const enabled = !profileLoading;
    const navigate = useNavigate();

    const { refetch, data: { students, classData } = {}, isLoading, error } = useQuery({
        queryKey: ['allclasseslist', classID],
        enabled: enabled,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-classes/class-list/${classID}`);
            // console.log(res.data)
            return res?.data;
        },
    });

    const handleKickOut = _id => {
        if (role !== "Admin") {
            Swal.fire({
                icon: 'error',
                title: `Unauthorized `,
                text: `You can't Kick out`,
                showConfirmButton: false
            })
            return;
        }
        axiosSecure.delete(`/kick-out-from-class/${_id}`)
            .then(data => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `${data.data?.message} `,
                    showConfirmButton: false
                })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: `${error?.code} ${error?.response?.status} `,
                    text: `${error?.response?.data?.message}`,
                    showConfirmButton: false
                })
            })
    }

    if (error) {

        Swal.fire({
            icon: 'error',
            title: `${error?.code} ${error?.response?.status} `,
            text: `${error?.response?.data?.message}`,
            showConfirmButton: false
        })
        return navigate('/dashboard/my-classes')
    }
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <section className='w-screen md:w-full'>
            <SetTitle title={`${classData?.className || "Course Detail"}`} />
            <SectionTitle h1={`${classData?.className || "Course Detail"}`} />
            <CourseData_AdminInstructorClassDetailView courseData={classData} lengthOFStudents={students && Array.isArray(students) && students.length || 0} />



            <SectionTitle h3="Enrolled Students" />
            <div className=' flex justify-center items-center flex-wrap gap-5 pb-20'>
                {
                    students && Array.isArray(students) &&
                    students.map((student, _idx) => <StudentCard_AdminInstructorClassDetailView
                        key={_idx}
                        Student={student}
                        role={role}
                        handleKickOut={handleKickOut}

                    />
                    )
                }
            </div>

        </section>
    );
};

export default AdminInstructorClassDetailView;