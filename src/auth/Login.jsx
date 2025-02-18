// import * as React from 'react';
// import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
// import GlobalStyles from '@mui/joy/GlobalStyles';
// import CssBaseline from '@mui/joy/CssBaseline';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
// import IconButton from '@mui/joy/IconButton';
// import Input from '@mui/joy/Input';
// import Typography from '@mui/joy/Typography';
// import Stack from '@mui/joy/Stack';
// import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
// import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

// import configServ from '../services/config';
// import { useNavigate, redirect } from 'react-router-dom';
// import Cookies from 'js-cookie';


// function ColorSchemeToggle(props) {
//     const { onClick, ...other } = props;
//     const { mode, setMode } = useColorScheme();
//     const [mounted, setMounted] = React.useState(false);
//     React.useEffect(() => {
//         setMounted(true);
//     }, []);
//     if (!mounted) {
//         return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
//     }
//     return (
//         <IconButton
//             id="toggle-mode"
//             size="sm"
//             variant="outlined"
//             color="neutral"
//             aria-label="toggle light/dark mode"
//             {...other}
//             onClick={(event) => {
//                 if (mode === 'light') {
//                     setMode('dark');
//                 } else {
//                     setMode('light');
//                 }
//                 onClick?.(event);
//             }}
//         >
//             {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
//         </IconButton>
//     );
// }

// export default function Login() {

//     const [formData, setFormData] = React.useState({})
//     const navigate = useNavigate()

//     const handleOnChange = (e) => {
//         const { name, value } = e.target
//         setFormData((state) => ({
//             ...state,
//             [name]: value
//         }))
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const result = await configServ.login(formData)
//             Cookies.set('token', result.token, { expires: 1 })
//             navigate('/', { replace: true })
//         } catch (err) {
//             console.log(err)
//             alert(err?.response?.data?.error || 'Login failed')
//         }
//     }

//     return (
//         <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
//             <CssBaseline />
//             <GlobalStyles
//                 styles={{
//                     ':root': {
//                         '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
//                         '--Cover-width': '50vw', // must be `vw` only
//                         '--Form-maxWidth': '800px',
//                         '--Transition-duration': '0.4s', // set to `none` to disable transition
//                     },
//                 }}
//             />
//             <Box
//                 sx={(theme) => ({
//                     width:
//                         'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
//                     transition: 'width var(--Transition-duration)',
//                     transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
//                     position: 'relative',
//                     zIndex: 1,
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     backdropFilter: 'blur(12px)',
//                     backgroundColor: 'rgba(255 255 255 / 0.2)',
//                     [theme.getColorSchemeSelector('dark')]: {
//                         backgroundColor: 'rgba(19 19 24 / 0.4)',
//                     },
//                 })}
//             >
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         minHeight: '100dvh',
//                         width:
//                             'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
//                         maxWidth: '100%',
//                         px: 2,
//                     }}
//                 >
//                     <Box
//                         component="header"
//                         sx={{
//                             py: 3,
//                             display: 'flex',
//                             alignItems: 'left',
//                             justifyContent: 'space-between',
//                         }}
//                     >
//                         <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
//                             <Typography level="title-lg">Pin at Ranchi Admin</Typography>
//                         </Box>
//                         <ColorSchemeToggle />
//                     </Box>
//                     <Box
//                         component="main"
//                         sx={{
//                             my: 'auto',
//                             py: 2,
//                             pb: 5,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             gap: 2,
//                             width: 400,
//                             maxWidth: '100%',
//                             mx: 'auto',
//                             borderRadius: 'sm',
//                             '& form': {
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 gap: 2,
//                             },
//                             [`& .${formLabelClasses.asterisk}`]: {
//                                 visibility: 'hidden',
//                             },
//                         }}
//                     >
//                         <Stack gap={4} sx={{ mt: 0 }}>
//                             <form >
//                                 <FormControl required>
//                                     <FormLabel>Email</FormLabel>
//                                     <Input type="email" value={formData.email || ''} name="email" onChange={handleOnChange} />
//                                 </FormControl>
//                                 <FormControl required>
//                                     <FormLabel>Password</FormLabel>
//                                     <Input type="password" value={formData.password || ''} name="password" onChange={handleOnChange} />
//                                 </FormControl>
//                                 <Stack gap={4} sx={{ mt: 2 }}>
//                                     <Button fullWidth onClick={handleSubmit}>
//                                         Login in
//                                     </Button>
//                                 </Stack>
//                             </form>
//                         </Stack>
//                     </Box>
//                     <Box component="footer" sx={{ py: 3 }}>
//                         <Typography level="body-xs" textAlign="center">
//                             VisiWMS {new Date().getFullYear()}
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//             <Box
//                 sx={(theme) => ({
//                     height: '100%',
//                     position: 'fixed',
//                     right: 0,
//                     top: 0,
//                     bottom: 0,
//                     left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
//                     transition:
//                         'background-image var(--Transition-duration), left var(--Transition-duration) !important',
//                     transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
//                     backgroundColor: 'background.level1',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundImage:
//                         'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
//                     [theme.getColorSchemeSelector('dark')]: {
//                         backgroundImage:
//                             'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
//                     },
//                 })}
//             />
//         </CssVarsProvider>
//     );
// }


// export const LoginLoader = () => {
//     const token = Cookies.get('token')
//     if (token) {
//         return redirect('/', { replace: true })
//     }
//     return null
// }
























import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import configServ from '../services/config';
import { useNavigate, redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ColorSchemeToggle(props) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            variant="outlined"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...other}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function Login() {
    const [formData, setFormData] = React.useState({ USER_CD: '', PASS_CD: '' });
    const navigate = useNavigate();




    console.log(formData);
    

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const result = await configServ.login(formData);
    //         Cookies.set('token', result.token, { expires: 1 });
    //         navigate('/', { replace: true });
    //     } catch (err) {
    //         console.log(err);
    //         alert(err?.response?.data?.error || 'Login failed');
    //     }
    // };





    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post("/api/login", {
            USER_CD: formData.USER_CD,
            PASS_CD: formData.PASS_CD,
          });
    
          if (response.status === 200) {
            const token = response.headers["x-gl-auth-token"];
            const userDetails = response.data[0];
            if (token && userDetails) {
              sessionStorage.setItem("authToken", token);
              Cookies.set('token', token, { expires: 1 });
              sessionStorage.setItem("USER_CD", formData.USER_CD);
              sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
              navigate("/");
            } else {
              console.log("Failed to retrieve token");
            }
          } else {
           console.log("Invalid Employee ID or Password");
          }
        } catch (error) {
         console.log("An error occurred while logging in");
          console.error(error);
        } 
      };
    














   








    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px',
                        '--Cover-width': '50vw',
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s',
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width:
                        'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width:
                            'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <Typography level="title-lg">VisiWMS</Typography>
                        </Box>
                        <ColorSchemeToggle />
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mt: 0 }}>
                            <form>
                                <FormControl required>
                                    <FormLabel>User Code</FormLabel>
                                    <Input
                                        type="text"
                                        value={formData.USER_CD}
                                        name="USER_CD"
                                        onChange={handleOnChange}
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password Code</FormLabel>
                                    <Input
                                        type="password"
                                        value={formData.PASS_CD}
                                        name="PASS_CD"
                                        onChange={handleOnChange}
                                    />
                                </FormControl>
                                <Stack gap={4} sx={{ mt: 2 }}>
                                    <Button fullWidth onClick={handleSubmit}>
                                        Login
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            VisiWMS {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </CssVarsProvider>
    );
}

export const LoginLoader = () => {
    const token = Cookies.get('token');
    if (token) {
        return redirect('/', { replace: true });
    }
    return null;
};
