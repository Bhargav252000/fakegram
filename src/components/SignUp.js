import React, { useRef, useState } from 'react'
import { Card, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { AnimatedText } from '../AnimatedText/AnimatedText'
import ParticlesBg from 'particles-bg'


const buttonVariants = {
    hover:{
        scale:1.06,
        transition: {
            duration:0.3,
        },
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow:"0px 0px 8px rgb(255,255,255)",
    }
}


const containerVariants = {
    hidden: {
        x: '100vw',
        opacity: 0
    },
    visible: {
        opacity:1,
        x:0,
        transition:{
            type:"spring",
            delay: 0.5
        }
    },
    exit:{
        x: '-100vh',
        transition:{
            ease: 'easeInOut'
        }
    }
}



export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signin } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try{
            setError("")
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to Create An Account')
        }

        setLoading(false)
    }

    return (
        <>  
            <ParticlesBg color="#ffa62b" type="cobweb" bg={true}/>
            <div className="heading" style={{opacity:"0.9"}}>
                <AnimatedText
                    textColor = "#ff4a4a"
                    overlayColor = "#ffa62b"
                >
                    FakeGram
                </AnimatedText>
            </div>
            <motion.Card
                variants={containerVariants}
                initial= "hidden"
                animate= "visible"
                exit="exit"
            >
                <Card.Body style={{margin:"auto",borderRadius: "15px", boxShadow:"5px 3px 8px rgba(0, 0,0, 0.5)",width:"550px" }}>
                    <h2 className= "text-center mb-4" style={{color: "#4e4e4e"}}>Sign Up</h2>
    
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit} style={{maxWidth: "450px"}}>
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password"> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm"> 
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <motion.button disabled={loading} className="w-100" type="submit"
                            variants={buttonVariants}
                            whileHover = "hover"
                            whileTap={{ scale: 0.9, x: "-2px", y: "4px" }}
                        >
                            Sign Up
                        </motion.button>
                    </Form>
                </Card.Body>
            </motion.Card>
            <div className = "w-100 text-center mt-2">
                Already Have An Account ? <Link to="/login" style={{color: "#444"}}>Log In</Link>
            </div>   
        </>
    )
}
