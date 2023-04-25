import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'
import { handleLogin } from '@store/authentication'
import { AbilityContext } from '@src/utility/context/Can'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser } from '@utils'
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, FormFeedback, UncontrolledTooltip } from 'reactstrap'
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>Vous avez reussi a se connecter en tant que  {role} sur Bibliomed </span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: '',
  loginEmail: ''
}

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const { control, setError, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const source = skin === 'dark' ? illustrationsDark : illustrationsLight;

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      try {
        const response = await fetch('http://localhost:4000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.loginEmail,
            password: data.password
          })
        });
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          localStorage.setItem('userData', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          console.log("-------------------------");
          console.log(getHomeRouteForLoggedInUser(result.user.role));
          navigate(getHomeRouteForLoggedInUser(result.user.role));
          console.log("-------------------------");
        } else {
          if (result.message === 'Utilisateur non trouvé') {
            setError('loginEmail', {
              type: 'manual',
              message: 'Email invalide'
            });
          } else if (result.message === 'Utilisateur non validé') {
            setError('password', {
              type: 'manual',
              message: 'Vous devez être validé par l\'administrateur pour vous connecter.'
            });
          } else if (result.message === 'Mot de passe incorrect') {
            setError('password', {
              type: 'manual',
              message: 'Mot de passe incorrect'
            });
          }
        }
      } catch (error) {
        console.error(error);
        // Display a generic error message
        setError('password', {
          type: 'manual',
          message: 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.'
        });
      }
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h1 className='brand-text text-primary ms-1'>BiblioMed</h1>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='4' sm='12'></Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5 my-3' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Bienvenue sur BiblioMed
            </CardTitle>
            <CardText className='mb-2'>Connectez vous pour accedez a des contenus privés </CardText>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input autoFocus type='email' placeholder='john Doe@example.com' {...field} invalid={errors.loginEmail ? true : false} />
                    )}
                    />
                    {errors.loginEmail && (
                    <FormFeedback type='invalid'>{errors.loginEmail.message}</FormFeedback>
                    )}
                    </div>
                    <div className='mb-1'>
            <Label className='form-label' for='login-password'>
              Password
            </Label>
            <Controller
              id='password'
              name='password'
              control={control}
              render={({ field }) => (
                <Input type='password' placeholder='*********' {...field} invalid={errors.password ? true : false} />
              )}
            />
            {errors.password && (
              <FormFeedback type='invalid'>{errors.password.message}</FormFeedback>
            )}
          </div>

          <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
        </Form>

        <p className='text-center mt-2'>
          <span className='mr-25'>Vous n'avez pas de compte?</span>
          <Link to='/register'>
            <span>S'enregistrer</span>
          </Link>
        </p>

       
      </Col>
    </Col>
    <Col className='d-none d-lg-flex align-items-center p-5' lg='4' sm='12'>
      
    </Col>
  </Row>
</div>
);
};


export default Login
