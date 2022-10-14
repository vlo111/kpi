import React, { useRef } from 'react'
import { Input } from '../../../components/forms/input/new'
import { InputRef, RefInput, UInputRef } from '../../../types/form'
import { FormEventHandler } from '../../../types/event'
import { Container, Wrapper } from './style'
import { ReactComponent as LogoSvg } from '../../../assets/icons/logo.svg'
import { Style } from '../../../data/style'

export const SignIn: React.FC = () => {
  const refEmail: RefInput = useRef(null)
  const refPassword: RefInput = useRef(null)

  const onSubmit: FormEventHandler = (ev) => {
    ev.preventDefault()
    if (refEmail.current != null) {
      const inputValue = (refEmail as InputRef)

      if (inputValue !== undefined) {
        const email = inputValue.current?.value
        console.log('email', email)
      }
    }

    if (refPassword.current != null) {
      const inputValue = (refPassword as InputRef)

      if (inputValue !== undefined) {
        const email = inputValue.current?.value
        console.log('email', email)
      }
    }
    /*
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
    */
  }

  return (
        <>
            <Wrapper>
                <Container>
                    <div className="logo">
                        <LogoSvg/>
                    </div>
                    <div className="title">
                        sign in
                    </div>
                    <form onSubmit={onSubmit}>
                        <Input
                            onRef={(ref: UInputRef) => {
                              refEmail.current = ref
                            }}
                            label="email address"
                            placeHolder="email address"
                            style={Style.SignInInput}
                            error="Please enter your email address in format: yourname@domain.com"
                        />
                        <Input
                            onRef={(ref: UInputRef) => {
                              refEmail.current = ref
                            }}
                            label="password"
                            placeHolder="password"
                            style={Style.SignInInput}
                        />
                        <button> submit</button>
                    </form>
                </Container>
            </Wrapper>
        </>
  )
}
