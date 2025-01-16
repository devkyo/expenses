
"use client"

import { ItemProvider } from '@/context/ItemContext';
import { Table } from '@/components/Table';
import { Form } from '@/components/Form';
import { FormCategory } from '@/components/FormCategory';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dateTime = moment.tz('America/Lima').toDate();
  console.log(dateTime);
  return (
    <div className="   items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ItemProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <FormCategory />
        <Form />
        <Table />
      </ItemProvider>
    </div>
  );
}
