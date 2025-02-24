import { useState } from "react";

export const useGreetings = () => {
    const [greetingId, setGreetingId] = useState<number>(0);
    const [name, setName] = useState<string>("Developer");

    const greetingsList = [
        "Hello",
        "Ciao",
        "Hola",
        "Bonjour",
        "Guten Tag",
        "Merhaba"
    ]

    const changeGreeting = () => {
        const nextGreetingId = greetingId + 1 >= greetingsList.length ? 0 : greetingId + 1;
        setGreetingId(nextGreetingId);
    }

    return {
        greeting: `${greetingsList[greetingId]}, ${name}`,
        changeGreeting,
        setToGreet: setName
    }




}