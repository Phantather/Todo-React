import React, {useState, useEffect, useRef} from 'react';
import NET from 'vanta/dist/vanta.net.min'
import * as THREE from "three"

const Vanta = () => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect]);
    return <div ref={myRef} className="vanta">

    </div>
};

export default Vanta;