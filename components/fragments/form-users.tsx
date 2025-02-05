/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Kelas } from "@prisma/client";
import { getKelas } from "@/lib/crudKelas";

const FormInputUsers = ({ state }: { state: any }) => {
  console.log("state", state);
  const [selectedRole, setSelectedRole] = React.useState("");
  const [classes, setClasses] = React.useState<Kelas[]>([]);

  const usernameError = Array.isArray(state?.error?.username)
    ? state.error.username[0]
    : state?.error?.username;
  const roleError = Array.isArray(state?.error?.role)
    ? state.error.role[0]
    : state?.error?.role;
  const kelasError = Array.isArray(state?.error?.kelas)
    ? state.error.kelas[0]
    : state?.error?.kelas;
  const passwordError = Array.isArray(state?.error?.password)
    ? state.error.password[0]
    : state?.error?.password;

  React.useEffect(() => {
    const fetchKelas = async () => {
      const KelasList = await getKelas();
      setClasses(KelasList || []);
    };
    fetchKelas();
  }, []);

  const groupClasses: Record<string, Kelas[]> = classes.reduce((acc, kelas) => {
    if (!acc[kelas.tingkat]) acc[kelas.tingkat] = [];
    acc[kelas.tingkat].push(kelas);
    return acc;
  }, {} as Record<string, Kelas[]>);

  return (
    <>
      <FormControl
        fullWidth
        className="mt-5"
        error={!!usernameError}
        variant="standard"
        sx={{
          "& .MuiInput-root": {
            backgroundColor: "transparent",
            "&:before": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.42)", // Warna hitam saat tidak fokus
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
            },
            "&:after": {
              borderBottom: "2px solid #3b82f6", // Warna biru-500 untuk border bottom saat focus
            },
            "& input": {
              color: "inherit",
              backgroundColor: "transparent",
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: "inherit",
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(0, 0, 0, 0.7)", // Warna hitam saat tidak fokus
            "&.Mui-focused": {
              color: "#3b82f6", // Warna biru-500 saat focus
            },
          },
          "& .MuiFormHelperText-root": {
            color: "error.main",
          },
        }}
      >
        <InputLabel htmlFor="component-error">Username</InputLabel>
        <Input
          placeholder="Masukan username"
          name="username"
          id="component-error"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">
          {usernameError}
        </FormHelperText>
      </FormControl>

      <label className="block mt-3 text-start mb-2 text-sm font-medium text-gray-900 ">
        Pilih Role
      </label>
      <select
        id="role"
        name="role"
        defaultValue=""
        onChange={(e) => setSelectedRole(e.target.value)}
        className={`bg-gray-50 border ${
          roleError ? "border-red-500" : "border-gray-300"
        }  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      >
        <option value="" disabled>
          Role
        </option>
        <option value="ADMIN">Admin</option>
        <option value="PROKTOR">Proktor</option>
      </select>
      {roleError && <p className="text-red-500">{roleError}</p>}

      {selectedRole === "PROKTOR" && (
        <Select name="kelas">
          <p className="mt-4 mb-2 text-start text-gray-500 text-sm">
            Harap pilih kelas untuk menentukan kelas yang di awasi Proktor
          </p>
          <SelectTrigger
            className={`${kelasError ? "border-red-700 border-2" : ""}`}
          >
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(groupClasses).map(([tingkat, tingkaatClasses]) => (
              <SelectGroup key={tingkat}>
                <SelectLabel>Tingka {tingkat}</SelectLabel>
                {tingkaatClasses.map((Kelas) => (
                  <SelectItem key={Kelas.id} value={Kelas.id.toString()}>
                    {Kelas.tingkat} {Kelas.jurusan}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
          {kelasError && (
            <p className="mt-2 text-start text-red-700 text-sm">{kelasError}</p>
          )}
        </Select>
      )}

      <FormControl
        fullWidth
        className="mt-5"
        error={!!passwordError}
        variant="standard"
        sx={{
          "& .MuiInput-root": {
            backgroundColor: "transparent",
            "&:before": {
              borderBottom: "1px solid rgba(0, 0, 0, 0.42)", // Warna hitam saat tidak fokus
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "2px solid rgba(0, 0, 0, 0.87)",
            },
            "&:after": {
              borderBottom: "2px solid #3b82f6", // Warna biru-500 untuk border bottom saat focus
            },
            "& input": {
              color: "inherit",
              backgroundColor: "transparent",
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: "inherit",
                transition: "background-color 5000s ease-in-out 0s",
              },
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(0, 0, 0, 0.7)", // Warna hitam saat tidak fokus
            "&.Mui-focused": {
              color: "#3b82f6", // Warna biru-500 saat focus
            },
          },
          "& .MuiFormHelperText-root": {
            color: "error.main",
          },
        }}
      >
        <InputLabel htmlFor="component-error">Password</InputLabel>
        <Input
          type="password"
          placeholder="Masukan password"
          name="password"
          id="component-error"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">
          {passwordError}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default FormInputUsers;
