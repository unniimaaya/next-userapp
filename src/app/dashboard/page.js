"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import AxiosInstance from "@/utils/AxiosInstance";

const Dashboard = () => {
  const [data, setData] = useState("");

  const getAllData = async () => {
    try {
      const allBanner = await AxiosInstance.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin_panel/banners`
      );
      console.log("getting all dataa", allBanner?.data?.data?.results);
      const sortedArray = allBanner?.data?.data?.results.sort(
        (a, b) => a.id - b.id
      );
      console.log("sortedd", sortedArray);

      setData(sortedArray);
    } catch (err) {
      console.log("error to fetching data", err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 350,
      editable: true,
      renderCell: (params) => {
        const imageUrl = `${params?.value}`;
        console.log("Image URL:", params?.value);

        return (
          <img
            src={imageUrl}
            alt="Image"
            style={{ width: "100px", height: "100px" }}
          />
        );
      },
    },

    {
      field: "order",
      headerName: "Order",
      type: "number",
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        // disablePagination
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // pageSizeOptions={[5]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Dashboard;
