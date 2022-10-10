import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";


function App() {
    let [waifu, setWaifu] = useState("");
    let [waifus, setWaifus] = useState([]);

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

    
    if (waifus.length > 0) {
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
    } else {
        return (
            <div className={"status-display"}>
                <h1>Loading...</h1>
                <br></br><span>If you have the time to read this message, it means the back end deployment may be down.</span>
                <br></br><span>This is due to the instability of free hosting on Azure. Thank you for your patience.</span>
                <br></br><span>For the server status, please check <a href="https://charles-waifu-list.azurewebsites.net/">https://charles-waifu-list.azurewebsites.net/</a></span>
            </div>
        );
    }
}

export default App;