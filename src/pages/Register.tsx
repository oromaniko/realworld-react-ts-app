import React, { FormEvent, useState } from 'react'
import { Form, FormButton, FormInput, PageContainer, Row } from '../mixins'
import styled from 'styled-components'
import { validateEmail } from '../helpers'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

const Register = () => {
    const { errors } = useTypedSelector((state) => state.auth)
    const { login, setErrors } = useActions()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isValid, setIsValid] = useState(true)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateEmail(email)) {
            login(email, password)
        } else {
            setErrors('')
            setIsValid(false)
        }
    }

    return (
        <PageContainer>
            <Column>
                <h1>Sign up</h1>
                <Form onSubmit={handleSubmit}>
                    {errors && <Error>{`Email or password ${errors}`}</Error>}
                    {!isValid && <Error>Invalid email</Error>}
                    <FormInput
                        onChange={(event) => setUsername(event.target.value)}
                        onFocus={() => setIsValid(true)}
                        value={username}
                        placeholder='Username'
                        type='text'
                        isValid={isValid}
                    />
                    <FormInput
                        onChange={(event) => setEmail(event.target.value)}
                        onFocus={() => setIsValid(true)}
                        value={email}
                        placeholder='Email'
                        type='email'
                        isValid={isValid}
                    />
                    <FormInput
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='Password'
                        type='password'
                        isValid={true}
                    />
                    <FormButton type='submit'>Sign in</FormButton>
                </Form>
            </Column>
        </PageContainer>
    )
}

export default Register

const Column = styled(Row)`
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    > * {
        max-width: 50%;
    }
`

const Error = styled.div`
    position: absolute;
    top: -25px;
    left: 25px;
    color: brown;
    font-size: 0.9rem;
`
