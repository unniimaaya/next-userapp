"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import AxiosInstance from "@/utils/AxiosInstance";
import { Button, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const router = useRouter();
  const [data, setData] = useState("");
  const BASE_URL = "https://interview.enfono.com/api_bcc";

  const getAllData = async () => {
    try {
      const allBanner = await AxiosInstance.get(
        `${BASE_URL}/api/admin_panel/banners`
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
  // logout
  const Logout = () => {
    localStorage.removeItem("AccessToken");
    router.push("/login");
  };

  useEffect(() => {
    getAllData();
  }, []);
  const columns = [
    { field: "id", headerName: "Sl.No", width: 100 },
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
            style={{  height: "150px" }}
          />
        );
      },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 110,
      editable: false,
      renderCell: (params) => {
        const status = params?.value ? "active" : "inactive";
        return (
          <>
            <Chip label={status} variant="outlined" />
          </>
        );
      },
    },

    {
      field: "order",
      headerName: "Order",
      type: "number",
      width: 110,
      editable: false,
    },
  ];

  return (
    <Box sx={{  width: "100%" }}>
      <Box className={classes.container}>
        <Button variant="contained" onClick={Logout}>
          Logout{" "}
        </Button>
      </Box>
      <div style={{paddingTop:"15px" }} >
      <DataGrid
      
        sx={{
          "& .MuiDataGrid-columnHeaders": { fontWeight: 700, fontSize: 20 },
        }}
        rows={data}
        columns={columns}
       hideFooter={true}
       rowHeight={150}
      />
      </div>
    </Box>
  );
};

export default Dashboard;
