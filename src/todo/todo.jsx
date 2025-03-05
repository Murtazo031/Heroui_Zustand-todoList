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
  const { dataUsers,setDataUsers, deleteUser, updateUser,addNewPerson } = tableUsetStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPerson, setNewPerson]= useState({
    id: null,
    name : "",
    role: "",
    status: false
  })

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
        style={{ borderCollapse: "collapse", width: "70%", margin: "auto" }}
      >
        <TableHeader>
          <TableColumn
            style={{
              backgroundColor: "grey",
              borderCollapse: "collapse",
              padding: "2vh",
              color: "white",
              textAlign: "start",
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
            }}
          >
            ACTIONS
          </TableColumn>
        </TableHeader>
        <TableBody>
          {dataUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey" }}
              >
                {user.name}
              </TableCell>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey" }}
              >
                {user.role}
              </TableCell>
              <TableCell
                style={{ padding: "2vh", borderBottom: "2px solid lightgrey" }}
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
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"2vh"
        }}
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new Person to Joke with
              </ModalHeader>
              <ModalBody>
                <Input placeholder="name" onChange={(e)=>setNewPerson({...newPerson, name: e.target.value})} />
                <Input placeholder="role" onChange={(e)=>setNewPerson({...newPerson, role : e.target.value})} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{
                  addNewPerson(newPerson)
                  onClose}}
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
