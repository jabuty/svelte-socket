export default async function fetchMovie(id:number = 1) {
    const res = await fetch(`https://randomuser.me/api/?results=${id}`);
    const { results } = await res.json();

    const data = results.map((r: { name: any; }) => ({
        name : r.name
    }));
    let name:string = data[0].name.first

    return name;
}