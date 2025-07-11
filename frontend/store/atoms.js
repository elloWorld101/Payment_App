import { atom } from "recoil"

export const loadAtom = atom({
    key: "loadAtom",
    default: false
})

export const disableAtom = atom({
    key: "disableAtom",
    default: false
})