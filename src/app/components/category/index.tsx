"use client";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    console.log(router);
    router.push(`/?categoryId=${event.target.value}`);
    setAge(event.target.value);
  };
  return (
    <div className="mx-8 w-fit">
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          borderRadius: 4,
        }}
        size="small"
      >
        <Select
          sx={{ borderRadius: 8, backgroundColor: "#fff" }}
          value={age}
          displayEmpty
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>Category</em>
          </MenuItem>
          <MenuItem value={1}>Sience</MenuItem>
          <MenuItem value={2}>Computer Sience</MenuItem>
          <MenuItem value={3}>UX Design</MenuItem>
          <MenuItem value={4}>Romantic</MenuItem>
          <MenuItem value={5}>Financial</MenuItem>
          <MenuItem value={6}>Entertainment</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Category;
