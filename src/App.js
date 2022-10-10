import React, { useEffect, useState } from "react";
import Axios from "axios";


function App() {
    const [waifu, setWaifu] = useState("");
    const [waifus, setWaifus] = useState([]);

    const getAllWaifus = () => {
        fetch("https://charles-waifu-list.azurewebsites.net/api/all")
        .then(res => res.json())
        .then(data => {
            // Make sure to sort the array of waifus by rank
            setWaifus(data.sort(function(a, b){
                return a.rank - b.rank;
            }));
        });
    }

    const addWaifu = () => {
        fetch("https://charles-waifu-list.azurewebsites.net/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: "Makise Kurisu",
                anime: "Steins;Gate",
                rank: 2,
                description: "The assistant",
                image: "makise_kurisu.png"
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    const getWaifu = () => {
        Axios.get("https://charles-waifu-list.azurewebsites.net/api", {
            params: {
                name: "Lynn Wiles"
            }
        })
        .then(res => res.data)
        .then(data => {
            console.log(data);
            setWaifu(data);
        });
    }

    // Run this code once when the component is mounted
    useEffect(() => {
        getWaifu();
        getAllWaifus();
    }, []);

    return (
        <table className="waifu-table">
        <thead>
            <tr>
                <th><center>Rank</center></th>
                <th><center>Name</center></th>
                <th><center>Anime</center></th>
                <th><center>Image</center></th>
            </tr>
        </thead>
        
        {waifus.map(function(waifu, i) {
            return (
                <tr key={i}>
                    <td width="10%">{waifu.rank}</td>
                    <td width="30%">{waifu.name}</td>
                    <td width="30%">{waifu.anime}</td>
                    <td width="30%"><img src={`${process.env.REACT_APP_SUPABASE_BUCKET}${waifu.image}`} width="100%"></img></td>
                </tr>
            );
        })}
        </table>
    );
}

export default App;