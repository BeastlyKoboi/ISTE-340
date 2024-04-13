const Welcome2 = ({ name, job, myStyle }) => {
    return (
        <section className={myStyle}>
            <h1>Hi, {name}</h1>
            <p>you do: {job}</p>
        </section>
    )
}

export default Welcome2;