"use client"

export default function Error({ error, reset}) {
    return(
        <div> 
            <p>Something went wrong loading leads.</p>
            <button onClick={() => reset()}>Try Again</button>
        </div>
    );
}