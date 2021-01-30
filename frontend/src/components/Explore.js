import axios from "axios";
import { useAuth } from "../utils/Auth.js";
import { useEffect, useState } from "react";


const MAX_FONT_SIZE = 48;
const MIN_FONT_SIZE = 24;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export const Explore = () => {
    const auth = useAuth();
    const [tags, setTags] = useState([]);

    const fetchTags = () => {
        const options = {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
        }

        axios.get(`http://localhost:50001/explore`, options)
            .then(res => {

                const reducer = (acc, val) => {
                    const addCount = () => {
                        acc.arr.push({tag: acc.tag, count: val})
                        acc.push = !acc.push;
                        acc.max = acc.max < val ? val : acc.max;
                        return acc;
                    }

                    const addTag = () => {
                        acc.tag = val;
                        acc.push = !acc.push;
                        return acc;
                    }

                    return acc.push ? addCount() : addTag();
                }

                const acc = { arr: [], max: 0, push: false }
                const data = res.data
                    .reduce(reducer, acc)
                    .arr
                    .map(({ tag, count }) => {
                        const fontSize = Math.round((MAX_FONT_SIZE - MIN_FONT_SIZE) * (count - 1) / (acc.max - 1) + MIN_FONT_SIZE);
                        return { tag, fontSize };
                    })
                    .sort(() => Math.random() - 0.5);

                setTags(data.map(({tag, fontSize}) => <Tag value={tag} size={fontSize}/>));
                
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchTags();
    }, []);
    return <div>{tags}</div>;
}

const Tag = ({value, size}) => {
    return (<a style={{fontSize: size}} href={`${FRONTEND_URL}/home?q=${value}`}>#{value} </a>)
}