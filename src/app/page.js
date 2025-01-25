
"use client"

import { ItemProvider } from '@/context/ItemContext';
import { Table } from '@/components/Table';
import { Form } from '@/components/Form';
import { FormCategory } from '@/components/FormCategory';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import "react-toastify/dist/ReactToastify.css";
import { Chart } from '@/components/Charts';

export default function Home() {
  const dateTime = moment.tz('America/Lima').toDate();
  console.log(dateTime);
  return (
    <div className='grid lg:grid-cols-[40%_60%] md:grid-cols-[50%_50%]  items-start min-h-screen p-8 pb-20 xs   font-[family-name:var(--font-geist-sans)]'>

        <ItemProvider>
          <div className=" min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
              <ToastContainer position="top-center" autoClose={3000} />
              <h3 className='text-[24px] text-left font-bold pb-4  pl-4'>Add a things</h3>
              <FormCategory />
              <Form />
              <Table />
          </div>
          <Chart/>
        </ItemProvider>
    </div>
  );
}
