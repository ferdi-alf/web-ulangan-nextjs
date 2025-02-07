"use client";
import * as React from "react";
import {
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Checkbox,
  TableHead,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import { toast } from "react-toastify";
import Image from "next/image";
import { deleteUsers, getUsers } from "@/lib/crudUsers";
import ModalUpdateUsers from "@/components/dialog/ModalUpdateUsers";

interface KelasId {
  id: string;
  tingkat: string;
  jurusan: string;
}

interface UsersData {
  id: string;
  username: string;
  role: string;
  kelasId?: KelasId;
  image?: string;
}

export default function DataUsers() {
  const [admins, setAdmins] = React.useState<UsersData[]>([]);
  const [proktors, setProktors] = React.useState<UsersData[]>([]);
  const [selectedAdmins, setSelectedAdmins] = React.useState<string[]>([]);
  const [selectedProktors, setSelectedProktors] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    async function fetchUsers() {
      const rawData = await getUsers();
      const data = rawData.map((user) => ({
        id: user.id,
        username: user.username || "",
        role: user.role,
        kelasId: user.kelas
          ? {
              id: user.kelas.id,
              tingkat: user.kelas.tingkat,
              jurusan: user.kelas.jurusan || "",
            }
          : undefined,
        image: user.image || "",
      })) as UsersData[];

      setAdmins(data.filter((user) => user.role === "ADMIN"));
      setProktors(data.filter((user) => user.role === "PROKTOR"));
    }
    fetchUsers();
  }, []);

  const handleDelete = async (
    selectedIds: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    try {
      // Contoh delete logic jika dibutuhkan
      const response = await deleteUsers(selectedIds);
      setAdmins((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
      setProktors((prev) =>
        prev.filter((row) => !selectedIds.includes(row.id))
      );
      setSelected([]);

      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error deleting users", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <UserTable
        title="Data Akses Admin"
        users={admins}
        selected={selectedAdmins}
        setSelected={setSelectedAdmins}
        handleDelete={() => handleDelete(selectedAdmins, setSelectedAdmins)}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <UserTable
        title="Data Akses Proktor"
        users={proktors}
        selected={selectedProktors}
        setSelected={setSelectedProktors}
        handleDelete={() => handleDelete(selectedProktors, setSelectedProktors)}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Box>
  );
}

// Reusable User Table Component
function UserTable({
  title,
  users,
  selected,
  setSelected,
  handleDelete,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  title: string;
  users: UsersData[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  handleDelete: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const isSelected = (id: string) => selected.includes(id);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor:
            selected.length > 0
              ? (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  )
              : "transparent",
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: "1 1 100%" }} variant="h6">
            {title}
          </Typography>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>No</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              {title === "Data Akses Proktor" && <TableCell>Kelas</TableCell>}
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                console.log(row);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Image
                        className="rounded-full"
                        height={50}
                        width={50}
                        alt="avatar"
                        src={row.image || "/avatar.png"}
                      />
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    {/* Hanya tampil di tabel Proktor */}
                    {title === "Data Akses Proktor" && (
                      <>
                        <TableCell>
                          {row.kelasId?.tingkat || "-"} {" - "}
                          {row.kelasId?.jurusan || "-"}
                        </TableCell>
                      </>
                    )}
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <ModalUpdateUsers userData={row} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
