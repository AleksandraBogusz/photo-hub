import axios from "axios";
import { useAuth } from "../utils/Auth.js";
import { useEffect, useState } from "react";

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
                        return acc;
                    }

                    const addTag = () => {
                        acc.tag = val;
                        acc.push = !acc.push;
                        return acc;
                    }

                    return acc.push ? addCount() : addTag();
                }

                const data = res.data.reduce(reducer, { arr: [], push: false }).arr;
                const max = data.reduce((acc, {count}) => acc > count ? acc : count, 0);

                setTags(data.map(({tag, count}) => <Tag value={tag} count={count} max={max}/>));
                
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchTags();
    }, []);
    return <div>{tags}</div>;
}

const Tag = ({value, count, max}) => {
    return (<p>{value}</p>);
}