// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// const movies = [
//   {
//     value: "Movies",
//     label: "Movies",
//   },
//   {
//     value: "My Movies",
//     label: "My Movies",
//   },
//   {
//     value: "Create Movie",
//     label: "Create Movie",
//   },
// ];

// export default function SelectMoviesFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         "& .MuiTextField-root": { m: 1, width: "25ch" },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-select-currency"
//           select
//           label="Select"
//           defaultValue="EUR"
//           helperText="Please select your currency"
//         >
//           {movies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           id="outlined-select-currency-native"
//           select
//           label="Native select"
//           defaultValue="EUR"
//           SelectProps={{
//             native: true,
//           }}
//           helperText="Please select your currency"
//         >
//           {movies.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </TextField>
//       </div>
//       <div>
//         <TextField
//           id="filled-select-currency"
//           select
//           label="Select"
//           defaultValue="EUR"
//           helperText="Please select your currency"
//           variant="filled"
//         >
//           {movies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           id="filled-select-currency-native"
//           select
//           label="Native select"
//           defaultValue="EUR"
//           SelectProps={{
//             native: true,
//           }}
//           helperText="Please select your currency"
//           variant="filled"
//         >
//           {movies.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </TextField>
//       </div>
//       <div>
//         <TextField
//           id="standard-select-currency"
//           select
//           label="Select"
//           defaultValue="EUR"
//           helperText="Please select your currency"
//           variant="standard"
//         >
//           {movies.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           id="standard-select-currency-native"
//           select
//           label="Native select"
//           defaultValue="EUR"
//           SelectProps={{
//             native: true,
//           }}
//           helperText="Please select your currency"
//           variant="standard"
//         >
//           {movies.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </TextField>
//       </div>
//     </Box>
//   );
// }
