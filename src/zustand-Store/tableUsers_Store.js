import { create } from "zustand";


export const tableUsetStore = create((set)=>({
    dataUsers : [
        {
            id : 1,
            name: "John Doe",
            role : "Raqosa",
            status: false
        },
        {
            id : 2,
            name: "Jack London",
            role : "Hofiz",
            status: true
        },
        {
            id : 3,
            name: "Ilon Mask",
            role : "Karnaychi",
            status: true
        },
    ],
    setDataUsers : (users)=> set (()=>({dataUsers: users})),
    deleteUser: (id)=> set ((state)=>({
     dataUsers: state.dataUsers.filter((user)=>user.id!==id)
    })),
    updateUser: (id)=> set ((state)=>({
        dataUsers: state.dataUsers.map((user)=>user.id===id? {...user, status: !user.status}:user)
    })),
    addNewPerson: (newPerson)=> set ((state)=>({
        dataUsers : [...state.dataUsers,{id:Date.now(), name: newPerson.name, role: newPerson.role}]
    }))
}))