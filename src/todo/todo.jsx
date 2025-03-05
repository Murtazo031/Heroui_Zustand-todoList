import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { tableUsetStore } from "../zustand-Store/tableUsers_Store";
import { Button, ButtonGroup } from "@heroui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { useState } from "react";

export default function TodoList() {
  const { dataUsers, deleteUser, updateUser, addNewPerson } = tableUsetStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPerson, setNewPerson] = useState({
    id: null,
    name: "",
    role: "",
    status: false,
  });

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: "",
    role: "",
    status: null,
  });

  return (
    <>
      <Button
        onPress={onOpenAdd}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "1vh",
          border: "none",
          borderRadius: "10px",
          width: "80px",
        }}
      >
        Add+
      </Button>
      <Table
        style={{ 
          borderCollapse: "collapse",
           width: "60%",
            margin: "auto",
            borderRadius:"20px",
           }}
      >
        <TableHeader>
          <TableColumn
            style={{
              backgroundColor: "grey",
              borderCollapse: "collapse",
              padding: "2vh",
              color: "white",
              textAlign: "start",
              borderRadius:"20px"
            }}
          >
            NAME
          </TableColumn>
          <TableColumn
            style={{
              backgroundColor: "grey",
              borderCollapse: "collapse",
              padding: "2vh",
              color: "white",
              textAlign: "start",
              borderRadius:"20px"
            }}
          >
            ROLE
          </TableColumn>
          <TableColumn
            style={{
              backgroundColor: "grey",
              borderCollapse: "collapse",
              padding: "2vh",
              color: "white",
              textAlign: "start",
              width: "15%",
              borderRadius:"20px"
            }}
          >
            STATUS
          </TableColumn>
          <TableColumn
            style={{
              backgroundColor: "grey",
              borderCollapse: "collapse",
              padding: "2vh",
              color: "white",
              textAlign: "start",
              borderRadius:"20px",
              width:"15vh"
            }}
          >
            ACTIONS
          </TableColumn>
        </TableHeader>
        <TableBody>
          {dataUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey",fontSize:"22px", fontWeight:"700" }}
              >
                {user.name}
              </TableCell>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey",fontSize:"22px", fontWeight:"500" }}
              >
                {user.role}
              </TableCell>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey",fontSize:"22px", fontWeight:"400" }}
              >
                {user.status ? "ACTIVE" : "INACTIVE"}
              </TableCell>
              <TableCell
                style={{
                  padding: "2vh",
                  borderBottom: "2px solid lightgrey",
                  display: "flex",
                  gap: "1vh",
                }}
              >
                <Button
                  onPress={() => deleteUser(user.id)}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    borderRadius: "10px",
                    padding: "1vh",
                  }}
                >
                  Dlete
                </Button>
                <Button
                  onPress={() => {
                    setSelectedUser(user);
                    onOpen();
                  }}
                  style={{
                    color: "white",
                    backgroundColor: "grey",
                    border: "none",
                    borderRadius: "50%",
                    padding: "1.4vh 1vh",
                  }}
                >
                  Info
                </Button>
                <Input
                  type="checkbox"
                  checked={user.status}
                  onChange={() => updateUser(user.id)}
                />
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "1vh",
                    borderRadius: "10px",
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/*MODAL INFO*/}
      <Drawer
        style={{
          position: "absolute",
          top: "0",
          left: "70%",
          width: "30vw",
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-around",
          padding: "4vh",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>Information:</DrawerHeader>
              <DrawerBody>
                <h1>{selectedUser.name}</h1>
                <h4>{selectedUser.role}</h4>
                <p>{selectedUser.status ? "ACTIVE" : "INACTIVE"}</p>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    padding: "1vh",
                    border: "none",
                    borderRadius: "10px",
                  }}
                  onPress={onClose}
                >
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/*MODAL ADD*/}
      <Modal
        style={{
          position: "absolute",
          top: "40%",
          left: "35%",
          width: "30vw",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2vh",
          backgroundColor: "bisque",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          boxShadow: "2px 0px 10px grey",
        }}
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader style={{ fontSize: "24px", fontWeight: "700" }}>
                Add new Person to Joke with
              </ModalHeader>
              <ModalBody
                style={{ display: "flex", flexDirection: "column", gap: "3vh" }}
              >
                <Input
                  style={{
                    padding: "2vh",
                    fontSize: "18px",
                    border: "none",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                  placeholder="name"
                  onChange={(e) =>
                    setNewPerson({ ...newPerson, name: e.target.value })
                  }
                />
                <Input
                  style={{
                    padding: "2vh",
                    fontSize: "18px",
                    border: "none",
                    borderRadius: "12px",
                    outline: "none",
                  }}
                  placeholder="role"
                  onChange={(e) =>
                    setNewPerson({ ...newPerson, role: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter style={{ display: "flex", gap: "2vh" }}>
                <Button
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    fontSize: "16px",
                    padding: "1vh",
                    borderRadius: "2vh",
                    border: "none",
                  }}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: "16px",
                    padding: "1vh",
                    borderRadius: "2vh",
                    border: "none",
                  }}
                  color="primary"
                  onPress={() => {
                    addNewPerson(newPerson);
                    onClose();
                    setNewPerson({
                      id: null,
                      name: "",
                      role: "",
                      status: false,
                    });
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
