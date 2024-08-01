import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import FeedList from '../../components/feed/FeedList';
import NavBar from '../../components/common/nav_bar/NavBar';
// import feedStyles from '../../css/feed/feedStyles.module.css';
import '../../css/feed/feedStyles.module.css';

const FeedListPage = () => {
  const navigate = useNavigate();
  const currentUser = 'user1';

  const [feeds, setFeeds] = useState([
    {
			image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIWFhUXGBgZFxcXGB4YHRgdGB8XGBYXGhYYHSghGBolHxcYIjIhJSkrLi4zFx8zODMtNygtLisBCgoKDg0OGxAQGyslICYtLS4rLS0vNSsrLSwtMy0tLS0vLS0tLS8vLS0vLS0rLS03LS0tLTctLTAtLS03LSstLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAMEBQcCAQj/xABFEAACAQIEAwUFBgMECgIDAAABAgMAEQQSITEFQVEGEyJhcTKBkaGxByNCUsHwFGLRcoKS4RUkM0NToqOywvFkcxY1Y//EABsBAAIDAQEBAAAAAAAAAAAAAAIDAAEEBQYH/8QAMhEAAgIBAwIDBwQCAgMAAAAAAAECEQMEITESQRNRcQUiMmGBkfAUobHBBtFS4TNCcv/aAAwDAQACEQMRAD8Aw41c8CQ5XK+0bD0F7n3VG4LhO/kWG2rmwa/s8yfMWB0rQI+ymEiBUyTC+jG1/kBpU6W1sXGSi9wc4RhGxE2RDcAava+Ufm9d7Ue8E7JQwnMc0jDYvy9BtepvCsBFHGBAqhOqbn1J1v61bRbeVNhjSAnkbByHFqMRMpQd4jgof5Sq3B6ij3hsiyIGW3mOlZhxDh8jPNi4zcB8pHMZQNfTyoo7JcW7xbIAJFFyv5/6aVxcjni1Db+Fnqv08NRoYzx8x2fy9QyEAtVH2kuMgH4jau4O1cBbK7d2wNiH0+e1dcYxMMixusinK4O456Vq64SWzOU9Nmg/ei/sUfE+HeFUA1OpoW7R8KCMjZbXFifNf8qOOLcdwsVmMiswGiqcxJ923voR4nOZozKRa5vbp0FZdRl6WqO97FwTUuqapfMoMJO0UodNCPn1FavgZs8SSrswBP761lGKjysPMUf9hMZeFojuuo9D+zWrSZffrzC/yLRRlg8aK3i9/R/9l/i8QskeWWJJ02tIoJHvoD4t9n2GxBLYWT+Hc/7p7lSfJvwj92o2EeUm3/sGouMjVY3ci4GpFdWkeGMG4jgXhleKQAOhs1jce48xUWj3tx2bDOZ8OG1CtJHqxGYaMo3I5WqLwvsfCwvNiu7PQKD0019RfekTag6Y2EHJbAjh4GdsqgknkKcxODeO2dSL6Db9Dpz+Bo6wOMwWCYxf7fW5YKLHcjXPfQaW8tavIuMYSZcixYcqRqpVgb9CQDvtpekSzNPZbDlhTXO5kVKtHbs1gpAWWGRevcz95lvz7uRQ3XT51R8U7MAErhiH/wDsbI+h1FnyrmHO1Gs0boB4ZVYKV7XpW3+RB+YrymihUhSNeioQ5NI16a8FQgq8NOsulMk1C2qPDSrwmuS1Qh1XJpZqVCEKvDXtcmqIeUqVKqIXHYqB3xkWQbEk+QsQT862eDBXGnzoK+y3hVo2mO8hsP7K6fM3+ArSMOlqdFUhcnuVfcZDdRYj2h1/rVhiIyq5re0oIG+40/flXmPjv4l9pfmOYpriE9hg2ucpkeFh/aVmS/oTRN0CiB2WwmTvoZCCx8ZH9rQ0O4qNsFigVvlvdfNenuohx5MWOgfk94z9NfeBU7tZwnvorqPGuq+fUVl1OHxIfNHZ9j65abPU/gntL/ZVdqMKuJQYmIDNa5A/EOfvoMK+VEvYriyxyd1LqhJsDyPSvO1nBe4luB93J4lI2F9SK4kU1dnutLk8Gf6aXHMX5ry+gMlPKifh5zcPk/lcfrQ/NYLpV9wJv9UdLA3za9KrLJKNjtXwq81/JRcUTRTV72PxWSaMnZrofft86qeIr4RS4bJppupuPdqKbCTjUvIrUYVmwyg+6o07GLbX8p+RpjikiJG0kjWRVzNrYG2trnrt76f74PHHJydQD7xas+7fY3vJYsICxyauF13tlv7h/wA3x77n7qaPlnhNTcX2KrGdqZ8QXmZRFFayqmhK6FVLbtqBfYabVQnHSi0xkKsfYC6WGvLz1/ZrzjkgvkUk2vpsBbpzPqT+lV7xMCAxsNBry6frShvyFBJucuYc+Xv0q04ViUDZvGD5AMPlY2/pVVCpDa8umv0oiwcMWUSAkHmBsbcwDt7jUZcbOcXiJhd0Rih1JyEf8wv9a5wHa7FJp3mdf+HLdvcraMBrte3lU/i8qmIFHUjcZWII9VO/voSLm9iL+u/yqnCMtmi+prdF1xKJMV44EKzXu0VrFgdfARo5BudlJB2Nrkbq7wN1KtuAbi+4I10bppUDiuHCSEDY2YDoHGax9L2o0q2FTV7kQ0hStSFWLPDXgrpq55VTLR6xvTbV2tIioW9xkivKfC088Gl6puglGyDXoNOSR1Hq7sodNeV4DSoWQVKlSqWQ3DsDhwMFARa5S/zOtEpPxql7GR5cHhx//Nddtxf9avyvwp6Edxtjex9xHrTOMw2bDsOccsUg/wAWVvk1PTIeX79alYVM+Zf+JGw99rj5ioy0DXaaMtGrgeJHU+9SL/pRTGQVB5EAj31VTJdet7EfU/K9SOz8h7sod42ZPcD4fkRUL7AZ2v4R3UolUeBzr/K36X+tXHCuIJi8K2Hm/wBonsH6GiPiuAWaNo2FwR+zQHg+C4tJM8cTtkbKxA0YafpXK1mncZdUVyex9l66Gp0/hZZVOG8W3X55FDjIGVmRvaU0S9m4A8Ehv7K3t12FWHaPsvJJJGY8veHRgTYWOxvzqx4b2blwkbCUp94rCwO3PW4rBPFJw3R1s/tHFkwqpLqdbenIC4lLgCosYyOOhrQexHZhJyZpheNTZFOzEbk9QNrUU8VxHD0PcSmEHTwEDS+1/wAtacWncoXJ0hWo9uQxZXhhBza5rsCfBMav8E5Y6RFifT2t6yuaVyZMVJcNKcw1IsDtoPLQX26VpPb7g64TCSGFvu52jQLe+W5u1jzBUNWXdoySABstr2O3r56/OujiUowUZdjyOunjnnlkx8S3/wB/uU009zcV7LKXsLajTzr3Dwai/wCzU/8A0Xmsy87gg20PMUTZlSY9wfhj5gSLa2/Z+HxopMqwyZO7urKDdeRtr+unKoGGiaEKJULK4IvqCpF7b6EaeVqjcUYRkEAow1BBb46nn8KnG4XyKjisVmNjbe46VAGtjz+tS8Riu83tmGl7etv3503Bt6HU/T9+VWmUx8Ei1uf1rzj5uY26xgf4Swv8LfCm4msaXEpSwiW2tjbTUlja3y286J9gJcFfXlSMXhJIjaWN4z0kUp/3AU1lqxRwa4JqR3NMMtQtHiV3XiinGqizmIa1excPutUke4otwg8A9KoKIPY/AFdeVU8qUZ44Aqb0IYs6kVTVFy3RHFd1yBXVQAVKlSqUQ3vsoL4OD/6oz/yiiCBrr50MdhZc2Cw//wBYX/DcfpV/hns5B9aehA64t6VIwUgBUj8LCky6VHwrDMw6i/w/91ZY/NBlZ1H4WIHpe4+RFNYRcsp6SAH+8unzW3wqXLIDJ/aRSfUeFvovxrzu/lqD9P351RB91pg42SEOYwCWU6HbNbwmpKm4piRajVqgoS6ZJkHsviDNhVZj44yY3PPwHwt6jQ+803xXEYqaMNMIwiyFVyEkki/iPqBXPZf7rF4qEjwyBZU8/wALj6fGmOFtIk7xN7GdtPOzWt7jXG1aqKi732+vY9ThcZTlkiltUlfk+UvTgJuwUwOFyjdHcEepLD5EVnnbPh0kWJlMgOV3LK3Ig62v1G1vKr0ztw14ZkJkjxCXdT10OnmM31otw3abBTLrKg/lkspHubf3UcVHJiUJOmi4ZMuk1EtTig5wn5eu/pT+jMk7S4uT/RUSve38TaMn8io97eQJsKEZV7yNFT2ivrzAJO/Uf4q1L7WcXh58MqQyI7o17JqACCDqNBuKzHs5hWZiQL5CC3kNLH05fCtUX0xpO6OVqerJleScOnqd1wc4ThD7EeYP6H+vlUuPASDUBR1ub68j+9KNeMYM5AYxdjCpW3MhVzfG9/X1oDPFZDYjfKV+F9viPjVxmqESi06JuPeVos2nh1Nj03J1Iqox2M74fzAa8/eP1FPRyySDJfU+XO2vqD+lQcHhwTl5jn/lVuZSiyuyeKx0NSZmAsLW5GimDsjIdb5r6i3+WoPlVFxrh0sLZZEI10JvqB/lVKabJKDii47Gdmhiy7SP3cMYu8mgt0A6k0acGhghzrhs1hrnkUBwNB4JAoOW/LkWNQMDAVwJCL4PuWc3H4vZNiDcX+tXvaiB4sAFz3lyqpJI0LNGQl9hYDbyPWkvJLr2NKww8Pfkjpi5PZEjhd7XNvhtRVJ2BwEsKjEYVBIQC8iju3zbm7RWv76z7sxDM0gEkoZ1AZVPOxBHi568q1iGXFSRBrQBjyDEgeV7e1RrLT4Zjnj+aMu7S/Y+6gvgZu8XU93IQG9FkHhPowHrWTY7DPHI0cilJFNmRhYg+Yr6zUy91mcBZFuSAbg+V9LgihrtdFA65JoUlikW9mAzJ5o+6kEcq0wfUJex81ga1b4eJSOVW3ajsPPhV79FaXDHUSW1QdJQPZt+bY+W1UcLi1EosqyPjAA2lXGE4mMoF6o8WRUVZTQy2CTLvH4640qgnOtdNMaaZr0Jbdnt69JpuvL1LBHL0qbvSqiG0fZjLfBRD8ruvzv+tGGMj2Ybg/sVn32TYi+GlX8st/cyj+hrSxtT48CZbMUMoKg33pqVLMr9Db3HSmjeNrj2Tv8Aynr6U9iNV91EQcaM94rX0GbS2+bLz/uipw015c/Q1EjfMqsDuAalrrVEHLWb1/YpmYU+guvmv0Ox921NPsKiIAnafismFxsUqWJMbLZttxfb3fCp/C+1YnzCSMK+YN4edtN96qvtPgt3L9GI+Iv+lQeyhySxyAXNwQOum1cfW319Lex7b2Xhw5dB1uPvJOnw++xK43ineQgsSqkhAToo6AVCqdxvFrLOzquQMAbXB8iRbzFQS9YWvJ38zvaf/wAUdq24OotGQ2/Ev1FWfHOx7QyGfCaqR4ozv6DXUfP1qpxDWF+mvwrUpDmRPRTf4V0vZ66oyTPMf5I3GWOS+f8AQP8ABMRHicPH3bDvYvAyG2a2gIsTv4RvyzCgzG9lZY8QbR2TNmBO1jqdvOifjCM+JmRI4S6BHUuCDZva8S6gg21t+KiTheEz2WQ5gRYX9L/DfemSTi6OPCSlHqMtxXCpHkH8JG7G9zpZVb+Vz7a/1qfhuxkoIeeQRnmBufeRRxjuDOQe6meJhzXLe2ugzCw5fCoUPB+8K99mdltmZ72JHMJmIFD1Og+lWd8K4aAAdwNiPrvUftRw2OeIoy3O6nmCNjRPPIFWwqgxT3quCXZQ8HHdRQpJfJmCydCEvlzW3W9jYb7VB+0jFyzCMwSMEUsxuB42bUsy7EcgLaXq9xiXjt51Akhzpa16U5uLtB9KlGmVnYl5J5Ywg7ucHKwGqlWB+8S+qjTYbW9K3PA4JYkCJsPmeZrNfsv4OVxkkjLYJEQpPV2H6KfjWp1rxPqXUYMy6ZdJGc+1QXx1C6AKLlWye9iCoowx7BVJ9KHcYLQofxGQSW62PhHv0pqfShS3ZYRXSLuh4zGgD9NrEW5jyrBPtN4dhop1fDDJ3mYvENlIt4l6Kcx8PK2mhsPoKHAZYspJu12kOxZm315Dl7qrJ+AYeRWieCN423UqDtzzb5td73o4u1uA9mfLZ1phhWp9uvsreANNgs0kY1aI6yIOZU/7xR/i9ay61RhWNstcVbR4W61BxMBBoOoJwaVkaua6NeGoCeUqVKoQ0T7IsR97NFf2kVv8Jsf+8VrWFe48xWF/Z1i+7x0V9nDIf7wuPmBW2wPY+W39KdB7Cp8kka32tTE0ZA8Oo6dKTeA2PPnTrS2FwKMoi8ExOZGXmjlTfzs3/lVzC2lB7yvBiw9/uJRlYflf8Leh299FmGNUiyXC1m12Oh9DXMy2NjuDXgFOzDMgPNdD/wCJ/fSoUVXEeziY4d1I7IB4rra+mwFwRzpYX7OooguTESgrsfDf4gCrjhLfeeqn+v6VYLjB+dbX8+l6RlxQk7aN2m1ufDHpxypeQHS9iRK5CgwiMWDZQRLe3iyhri1ufWoXEOwcsaM6yq+UE2ykE23tqaP48av4nT3Gn5lupHUH50rJp4ZN2tzZp/a+qw1BS91fJMwriH+zPoa1Dh+sMev4F+grM+IJZGHS4+GlaJ2cmzYWFusa/Ss/s/udT/Jd4Y36/wBAv2rxTwY5Jk1ORLjbMAWDL8P0oy4fjFkWORDodfMciD5iqXtF2bmxc8HdgZQjZ3OgXxC1+p1Og6UTw8CSDDBQxLINGP4j0yjkfjWzLG9zzeGdbEfHobmxqJhMZfMD+E5T66H9aG+3XEcdGitCoCkgMym7Lc2BswsB58qm8ExOHwsLd7io5Gdi0js66tYCw12AH72rK3ub0qRZ4yWquWnTxGOUXjNwdiNvcaiymhkyUMYtrC1O8FjBVyfL9arsXLc6bVacG0jc+YHw/wDdZ3uMqgq7Dx+GZurBf8Iv/wCVFBNUXYyO2Hv+Z2Pzy/8AjVviJQoJJsK6GLaCObmd5GVvGJdl1NzYAbknkKcwnDQrBmOZwAFHJB0Hn5/SlhgADO41Isg5qp8vzNp8h1qfAptc7nU+XlVL3nbBe3AitvWouJh5ipbVHme2lNFsrp2YbGsi+1PskpDYyBQri7TIBo45yAcmHMcxc7g316XnQ3x5rKT068/IjpTY77ME+fcFNcWp2eINXPH8GMNiZI1vkBDJ/YcBk1O5ANieoNdRSXFImqZqxytUVk2FIqK8RFXxANM4jDgg1SkSWPyKOlTjxm9e0YmjuCUqwZTZlIIPQjUH41u3Zbja4uFJPxEWcflYbj9ffWDCibsJxw4bEKCfu5CFfyJ0VvcSPdTIOgJKzdVAYWaue5IrmCS9jUonnTRRScYMagCUgBt7jSp3BcWrDKHDlPCSOegKk+oINd8Qw6yrldQw8xeoXDeFRwSPJGCoKjML6G2xAOxqgggRr05DJZ7HZ9D6/hPxqJhpgwBG1e4narKJeDuJkv1PzBFqIWjHQULme4SXmCC3qpAb5WNXGNmjV7OSC1rdDvoPhQMJE1oFO6j4Cuq5hjCrYXt/Wk8gG5AoSzG+PQ5ZZl6O/wBTaiz7Nj32EjX8pdT/AHWIqn7WYNjipii5gSDcbeyL6+tXX2eTwYLCkTzIskjs5Qm5QH2V058/fWDSxlGclR6f2vmx5dJifUr2277o0CKIKAoFgKH8ZxAyNYCyjYdTtc13/wDl2HYHuu8mI5Rxu+vIGw0qlGLl3GEnPqojH/UItWqcJM8/ilFbsmYyBXQq4BuLEHnfeqTC4ERQ9xYFF0W4uQN1B62677c9TdcPxDSyrFJA0QZHZWzo9yhQMvgY2NnB1p3ucO9iBM1xcWsOTGx6Hwka0HgyY/8AUxjyB+EcCRklYrb2dNCDre/KmcbjUJKowNtDY7dQfOrjtvDHBhRiEjdGEoRibk5fHqAdN7UGYzsg8lsVgZAvegO0ZOUXOpykab30PnrSp4JIZDURluTS9SsDOzAxILsSLAbm+lhUDhHY/iEzZWdUA3LNf4BAbn4VpnZnsrHhBmuZJSLGRtDbmEX8A99/OlRwyfPAzJqIxW27LbhGG7qCKM7qgB9beL53qOH7+XKP9mmrfzEbD0v8bVxxPFkt3EftEeM8lHmeQqdholii8I5X8z0/9Vo+L3VwjDVbvlnXtyfyp82O3wGvvHSpRprCxZVAO+pb1Op/flTPEcUUACi7too8+p8qNbK2A93SOpZgDlGpPL+tM4tbXY7D9f8AO/xp7B4bu1uxzOdWb9B5VG4tdo2Hl9CD+ho0CyujlMmw0vvQ32mxAsV50VzFcPBmOllrPYSZkmnbYkhfdTYcg0Z99onDjlixAGgvE/kdXjPvu4/u0H4bEZa1jGgPg51IveN9PMAsh9QQD7qx41eWO9hRbTLhJQacSS9UqTEU/Fitaz9I9ZCVJALmlTJxVe1VMlxIAroVxXQpliDbuwHaQYqLIxHeqAGHUjZh5H63ol/jUWQRFruQWEagsxAvc5VubaGvnjhnEZIJFlibK67dD1BHMGtZ4EiYhhxGLvjKGcyWKuqDKC0fdeFincvbMr3DW06ui7FtBnNiLK8hRwqC7XXKbDUkK9iw32HI9DVTxrtDFDlEqyLmFxe2ttxoTYg6FTqOYq54Hh5EMbszMvczoFIIClWzRHSwUlGI5EXIqg472ejfuhK7zEI0bt/ERoFCM7mUrIbs5z5gARZSBcWBN2UVM3baEFcisAmw3vc3a/lXcn2i30WMe+9OcF+z2OGdJMTOsiByVgVCzS5WYKGB2UlehvtzpvjnZXDPHiZhHLh5Io2cxKVMWYNlAH4k1v4b2FtNKgx4ZuDmlsvzggyfaDKBlCKAfK/K1WPZrtficZjIo3s4s5tlBy2Vgre5iv0oZ7J8I/iJjnUtHGud1G7WICoP7RIueQB52ozwPFDLKYHleNVZVe6ZRGCbgICLKt1Gg0Gh5UnJnWNpPcfotJLVRcrSS+777JFvhuMzzYcyDESK1spAWJFWWwGU5lvlDHfnTWJxDySthhiHYSYeYFmcMFcaobLaxGW9uhHWqHBQH/SEv+qrP/rDlo8oJFzLlAzbDW5vp4VuRRm/ZNYnixGcRkNl7qyhFEpI7tSoBJBk0Jvt0roTlGL6a5RiWP8A9ur6FIn2aNf7zGSt/Zht8Cz0Pcd7E4pJJRDHJLFFl8dhmN1ViMgN2Izfhvyoim+1Y3yjB+IG1jL+La3sdaNcRxkI2Rlu53CEe0AA18xFl8z0rFCORt27GycVToz7sFg5EDrOkiBXByvmivmSTXW1wDGKNoOH4Z0LpDmUgnNZm67Fh56W3tUuKaaZY7/w4ViSyqxluguCVaygtewva2tWPdsvhW2ViRfYoNToLWP6edKy4/et1/Jsxap9CStNfOlXIM4WVBPh2iFkeW22WweGZdrfmw6/GiK7MTY7E7MetuQHwoY7Q4wKTJGc3dSw39Y5IUf5TtUhuPusjEhQAD/XrVRyxjFWTLpsmXI3FeXJx9okGfhs43KFG58mUnc9L0Kdm2kjwsTqO8jZRdR7SkaG3UXB/etXXHcZJJhsShI8UL7DoDYfKqP7PsQxwagG+V3Fj65vo1DOanG49gfBlidSrcK+z/GFLgqRZiFYHlfa/pRJjMdZXKC5WwudBdtLCg4xKCSAASbmw3q5wq5sIQNzIdeZ9eppUsjp+haxrqQ9w7D52KKbqDeaT/iN+Qfy9feOtX8guR5a/wBKruBgCJQg0Nz7r2HyF/eashRYY+4n5g55XOvIUjgAk7DU1X8OUuxnYb6Rg8l6++pMqh2yHVRq3n0H76edSSKOrfyQrhDT3NeNECLcv66U8BVbx3iAhiZ7XtsOp3FGCBn2j8VOkCn+1b5ClPg+5weXomvrz+dU3C4WxeMzNqFOdvqB8bD0vRN2uOXDv6WpkXuSXZAJgVvGVOzC3xrGiK2LAPZR62rLe0GE7rETR2sA5sP5T4k/5SKN/CmW+Strw17XlJZR5elSpVRDquhXF66vVoh3WjdjO05w+GjiMUkhJzRCN8viMoupGU5r9yoGh0ZhzFZwDWnfZRhleSB3YDIuKKki+o7kH4LNI392mQ5BlwGmD4VLJFnkw6oxUqqSyySk7sEcosaqSSSbEkbH8o64ImJMqtJhYoIY4WZldTKVGRlCrN3jqbsSWUhWtmuDcmjHFsoGYaZHU5SLXGU2OS1/akA91R+LzFViZY3kCvl7tQxDLlJzZDfxKQoDEEXPvDG6VlYl1ZEmROzCmZv4qZhey5Myd3lQbNGb2y3LKR53uLi/PFDDlmicCPD928M87kIBqwTKPxupbfmT1rvEYlu7WPByFc5PtZFEecqoRlcfdsXLAKNfasCLWFeNyYY4WKCS0yqxaQwSNHlOqxEZlytpmFiNNTubmlcmbs0upym/RR4pei7f2Vv2a4wRSSglSjkIrgEXZPZ/D4VYSbnbTQ61ecWwztIzOpRQBmllGRTbQvfnfkBc7U72E4fhO8MAjk1+9yTFJQbqo8LIBrqm/LptRtgY4chKYeNbHYKNz1suj8iLaVmz6XFOak1v/IvQ6rLpE3FfftYH8C43hoZsxzSyZFjMqRki2hKllZs4BsAwW/h1uLWnca4zNIQIsG0zozFHyOES9wLXIzPY+3oBc2o0jvyCgX6Hb5V6c1vbHuH9TWhSS4RmnJzk5PuZbhez+KvdeHQqb3zOoJvvcmR2N/OjrBjLLMJY7NKwZLi4ICg5Aw0BBz3Hv2NXRiN/ab000+VReKFkiumpuB4tb38Ivz3IOnSr8S9gGu5xw/KS7Bg1myiwACgBfu1C7AHXXW/uqg4r2mw6uw/iYRlNiO9O40PhQNYg6bVUdnONfxSqquYIJO8DlzaSTEPdxEjq1yiprmAVrKNdTVWPszBdHGIXuGOYlSNIyCUyynRzcKL5QLNfW1qGUE3yHiyOG9DnHO1GDMMqrKpYpJpGj+J2sVJZo1HtKNT0o3Xh0PeK2W4NjqTbUaeVAkP2Yaz55GCg2hsyknS7s2niCsctrKTY7UZcJxchwUUptcQRMQVFwbAMCDrpY39KDohFcWO8bJkltKv2Jr8OizsuQeIMNr7j/OgP7LMNfD4hDo6TfG6gWPvQ2PWtBBlC3Oa/guFy3F/avl6evxrNuyWLfDY/HxLYjMxsRe+SRsp+D1NnDgB2pU3YW47DZACR7QuP3yqvl4ke7ESm1mJb+8AB8galycX74/e5QRba4GtD0PD3/jXuRkkGbMLlcqmONLX/ABauSK52rhJx6Y96Oloenqcp9k2vU0Xs9LmhzAWBNl9BYfW9WLtYfSm4lC2RRYKAAPkKdA19Nq2RVRSOfN9UmxQxZR8yep5n99K7vXlRcTI2y/E0QB5xDiCxrdjQBxjiEmJbKFLdFUfM9KK5OE5zeRs30qXg8EiDwgCoSyl7K8EbDqxkPicg2BvltewJ99QPtAxSrBk5sbD66/vnRRjprWrMO2mPEswQHYXHnRxXcpbsrMKNqC/tHw2WdJB/vEsfNk0/7SnwowWUhrelUf2hxZsPG9tVktfoGBv8wtOfw0FIzyvDXtcms7KPKVKlVEPbV7XQr21QqzgUa9icZOsf+rRtJNHNmCBS+ZJYnSQFV1tZNSLWuDcUFiifsDxv+FxJky5wY3UoGyk6cmsbEC52O1HB0ypcG98E4kcYgbu5Rl8BWUFGUlkdgwe1wAoGdc2a34TcFjtFxHH6YfCxZcwZWxDlRHHZQWKiNib3JHjXcaA70IYf7QpZriPBAgfnmLDmReyrc67VBxf2lY3OxMWHQjQ+ByeltZP05+dPbQrplzRZNxCZ/wD9igBwmIhYtEAGxMmVjClgQmUKGbOLaWAFQGjJH8RKqMrFgQri+d8zaqGzCxN9eQF6sVwONxEMz4lPv5zG8EIjZTbDg94w0srFJTYE3axHMVxhMGrKplw+IRIo3Zu8Qxxl+d2sGJZygsCCQABtepbVV57+g6L7vkuOw7CIGeR8pcqkZf8AJGymc94fCqkkAAkXyWFG8naaAAnMLXsDnjsxsTYMHteynU2AtqRQli8RDAkYJZrMyRxoFjUFmJJFwzEFkDXYnrUjEcOiDQyYhGEzOMhWRmCljlIZiLEWIFrAG5HnQSlFyoqpPsT+I9u4I2KPkR1NmV5RcHoREHNVDfaThlvlMWpv4RM+u/4o0HzoM4sYMUUk7ie9ggbvY0LC4CBrI/sezewNhY3y0xBwuGwthdT/AMTEOSNQCD3aJ1+VC8mOO1odHRZ57qDND4H2+/iZu7jOyM5+5CCy8sxmY7kfh61YCeUTWzHLkuDc+0DY31taxGnkaznAt3EiyQxYdGB0IWV21uCPHNa1r38r0XR9okdUkSDEOWV9EVCEsxRg0ryKo1QWJ5W864XtbTajVSi9M+Ltcb9n2NUMb00X4yq/qDXbGRsLPho8LEgRBJiVS5bxtmEjMCdFURnKOgqHicVHh0/0fizI5ixMTuyG65FSNTGNcwyrcC3PpRfEj4oCaaCKN45AhKyrIRhcsua+VyAQJNdr2HkKl4rhsWNL4sIg/icCEgz2B7xxK7E21DKqp4raXNq70FKMEpvet/U5nVGTbjwCaY5Ex+JJ76YYuKX+HEOpKzk6lWIKnwdL6XrSuF4ZxDEsrWlCDNz8QuTc7G92vVNwvg8ccuE7lVR4UZJXKANOvd2AvbmwB1sQDpzqzXEoQZVYOimQMFBNu7bLIBffKQfXlyrHq80+heGupN7/AIhuFRk27JeMlKsN9hqux6bbG1CfHcBh4McswZxPiRJeM2ylQgZiBa6+JF3J3NFqse8yd0xBFu8WzKSebDNmU6DW1t6CO3faNkaHD5Q3eZX7xrXHiZMqADQ3Gpubg0vTaeeNyk3s/wA7jJzTaQ1wrDl8zb3NwPTapEmMMQsTcX2P6dKmdlYAkDO2wufgKquBQnEzNIR92hNvM/5U5cBPkMez3GgQwkupABuxvsNKmp2ii5Bz7h/Wgk8RHeygbXt8OXzpiTEspzC5XmBuPTr9ajtA0mHR7Sxflf4D+tO4XjcUjZNQTtf6UHd4GUEG6nYj93BrjDwOXUIb3Iq7fYqkaHIlR5GtrUoMKruOzhIy1MQtg/2o4pl0B1y/XQVnMwzliT536W2P61adoseXcm/QD3fs1UuvgPnp+pprrgOCpWMtibmmO0MfeYOUcwub/AQx+QNPxYepKRAqV5EEfHSrhbLkZCa8NdSIQSDuCQfdpXFJYAqVKlVEHDXVJTprXW+1ECcOKkcLP3qXNgWCknkG8JPuBqOxryNrG/Sxqr3LRq+JCwgIPDCgPKxdr9fxE6dNvSx12LgwU2ESVoYzJYiQlS5Fi29gbEqAdKyvCTRtNEJ5LxZwGBJ0F9720XzvtRzxTGfw0sEODkSPvpAZAEQ5I1ALuNNAFBPQ2NNhjSt2dCOsjP3H7iXFef2Ozi3miKSzBVe/hjDIJixzFpAoOrI0QzkaMTYX0oH4jicVg8SM8ssqjVRK7MsiaoyOpJF/aRhyNyN1NaBxQtHHAqFI5GkMrM9vCBeSUna+rAG1tztXHFuHRY/DLKLDMO8Iv4kynIz2H4fCUYjdQDqUUHhaT2nkyZ26bxybp/8AGtk/R19zLm6ZSbgtt/sT+GTRlI8QACZAvc5rX0GUyEH8Y9nkGZS1rVIjxJmVZEZs5sQlxlf+6TljlF+R1sba6VFx8Bdvu2QJmsoy3t3Z0jBDeAqBlK2uNSN71F4VhiCFCOzMWUkNZCQxW+QtcWCDloPfWfPrsi1Drs66fPn03f1OthxLw077c/nkEMHZDCGBUdGRmzSsyyG4JJZ0zgAFRmI2tYX31qu472JgTDyS4dQ7omcLM8rBgozEeGVQD003owdzEiqc0r5VUC1wW2uTyHqedVb8biCPG470qn3gy2QjxZtTuttyBbQ+Yr0UZd2jiuU+E216mJQ8Yd3VI8PhQzMqr9yH1YgD/aFuoolxnE5P4gRQojxQXHd5EVZCQVLmNcq3PtHa2g6UQ46KLHRmaOJFxeFyTIIxbOqkOYSL6nw2F7alTYAkVQR4hIZm7qGaZpWWWMxsMrRraRSBa97XvvuNjW7T8Sa5MmRQ8SKy/Dv9X2O5eJ4iIM0uDC2t3U0UckQV7HqDcDUtZtl0vRD2T4YjlcYSQGQ5Y7kIhJZZZIl2USaDQD/eW0YV5x7tfE+AlkQqzFgndyQufECCuYkrksQTrqbaVK4DjcTPFhXEaxrmBmbWxRAo+7UDwljYa3yhSLjSl6yOXJgqKp3V+XnRWLw45rX2/PItccyM2RhI7lCAka3cAhlzG4sg10zH3VF7O8PjwqjDwNLEzsXKYpM3eaAEBlKgaDl11Bq3wEwgjkcgM5LSSOTlGp0BJGmUaW8qrsXGcQ7SsLC2WMm4ybFXTQa6XJ125Vy8WOeKHTF/R/nJ1lDTuTTVL/ku79PL9wmVDYWAAtsDYeg2+lZb9tkeWTCS9M4/wlGH1NGGCwkmIKyDESJ3saSEA5gthGpVVbRA13N1sbkG+lqFOO9lo5RJ3oPeM0yrdn0YB+7ZQ0uWz5V8IS3jsOVbo1JWYZJwm0+z/gsu0+MEGBVF9qS1vfrU7CQjC4G/MJc+p/zoK798YcMXFriPToFA09b3+NHXaSK+FKDoP0rGuTTLZAVgEIVC27kk+/WrHicWRIxzZmP0A+lQllDTxquyAD386ldqpwJI0/Iov79auyqOMdxF4Y1lWzAWEiHmNr+R1vf1on7E4uGVmZTZiuinca6+vuoQwC99DKX1BIW3kdD9amcFwlgchIZdQQdR5g0Dbi7RbSao02R7b0G9teIHKFvufpRJFIz4dXOrZd+ttCKzPtTxAs3kLgeprVCuRCW9FNipczemn9a7d7AD961CVqdz1Sd2x1DucmpMFRAafgamw2BYC8Z4fh0nlEhmvmLDKqAeLxCxLXI1FQzBhP8A5H/Tq+7c4ezRS29pSp/um4/7j8KGDQSVMWSO5wn/AMj/AKdKotKgJREOteqbUqVVZdHjGvKVKoQ1X7PuFGXNiymfu08CXAzOVvz2AB38/KiHC9lQj/xSwCJ8siyQghlIcWLIdADY+ybAgkXF7hUq85r9dlxavpjxsvo0rVfX1NmLFGWPf5soOMdsMPKQZIJXZLgapDa+/OXoPhRX2dxiynBsqZFdF8N81hmkjcZgFv8Ai5DevaVd6ODHij0wjSB0TfW//llouKjUFnLd0zOBGqgDwn2yRa0hOuYDy20qK0sbI6nvPHoCjBGyA+JSSpHitYkWuNNL15Srh6zNL9T1Krjw6VnXjhj0dPZ/0/kHmFnzqJNswBtrvba/ShHBdl1M+IedWdEe0SZ9CDm3t4rWe1r26g6V7Sr0MJt4lL5X+x56aSyOK8yasOFwxE6Rd06Iw7uOwVh56AHlqbe+1CXFuM5cM07qXeJ4xdG7plV84IRlHXLoQRv1vSpVq0rcsTn3sN4ozwz6ldUTOxePXGlriVkUBR3wQjMoLD2dXK5Qbt1vvVrAkhhxsbBnfL3Za4AtGNwCxsSJL6AC/wCEa0qVH1OS3MkYrHJV++5Kx7Fkid4pO4DB3QmPMRYZL5WIK35XvptT+N4//ERukCsiZT3srWGRAPFlRSSzW8qVKuVlk/1HQuHR3MMV+j8Vq3Hjy333X52InYftHFimJiBCAmJAdMqgFkY9Q6pfqCCOdSuO4u0pQX8LRlzc+FRaTNluAw0C2HW9KlXQpKVHGtvdgV2IjzMAw1R5VI3sUkYWvz2op7S4oJGSaVKsj5fqafIFez8V5c394+g/9VS8SxplkmfztSpUHcItuCtbCv8A2r/C1WXZ17SMP5T9KVKrBDrguuGHkW+p/rWMcbmvK/QMQPjrSpU1fCDH4hsYQgA9a5yWpUqa1QwcjNSo470qVXEBld20wufDXH+7IY+nsn/uHwrPzSpVJ8gHNKlSpVkP/9k=',
			content: '좋은 시간, 좋은 분위기',
      author: 'user1',
      date: '2024-07-25 23:20',
      comments: [
				{ author: 'user1', content: '멋져요!' },
        { author: 'user2', content: '좋아요!' },
        { author: 'user3', content: '그뤠잇!' }
      ],
    },
    {
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdJjnvUgBV1lz_05tD6iP1Es8Kx7TQU1S2A&s',
			content: '남주혁 존잘',
			author: '로콜리',
			date: '2024-07-25 23:20',
			likes: 10,
			comments: [
				{ author: 'user1', content: '멋져요!' },
				{ author: 'user2', content: '좋아요!' },
				{ author: 'user3', content: '그뤠잇!' }
			],
    },
  ]);

  const handleEditComment = (feedIndex, commentIndex) => {
    const newContent = prompt('새로운 댓글 내용을 입력하세요:', feeds[feedIndex].comments[commentIndex].content);
    if (newContent) {
      const updateFeeds = [...feeds];
      updateFeeds[feedIndex].comments[commentIndex].content = newContent;
      setFeeds(updateFeeds);
			}
		};

  const handleDeleteComment = (feedIndex, commentIndex) => {
    const updatedFeeds = feeds.map((feed, fIndex) => {
      if (fIndex === feedIndex) {
        return {
          ...feed,
          comments: feed.comments.filter((_, cIndex) => cIndex !== commentIndex)
        };
      }
      return feed;
    });
		setFeeds(updatedFeeds);
  };

  if(feeds.length==0){
    return
    (
      <div className='min-h-screen bg-custom-gradient'>
          <img src={logo} alt="Logo" className="mx-auto h-20" />
          <div className="p-4 overflow-auto">
            <FeedList feeds={feeds} />
          </div>
      </div>
    );
  }else{
    return (
        <div className="w-full h-full min-h-screen bg-custom-gradient relative">
          <header className="mb-4 flex justify-center items-center relative p-4">
            <button 
              className="absolute left-4 text-xl text-black p-4"
              onClick={() => navigate('/main')}
            >
            &lt;
            </button>
            <img src={logo} alt="Logo" className="mx-auto h-20" />
          </header>
          <div className="flex flex-col h-4/5 pt-0 pr-0 pl-0 pb-9">
            <div className="flex-1 overflow-auto hide-scrollbar">
              <FeedList
                feeds={feeds}
                currentUser={currentUser}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
              />
            </div>
          </div>
          <button
            className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
            onClick={() => navigate('/feedcreate')}
            style={{ bottom: '6rem', right: '3rem', opacity: 0.3 }}
          >
            +
          </button>
          < NavBar />
        </div>
      );
  };
}

  


export default FeedListPage;


// import React, { useState } from 'react';
// import logo from '../assets/logo.png';
// import FeedList from '../components/FeedList';

// const FeedListPage = () => {
//   const [feeds, setFeeds] = useState([]); // 초기에는 빈 배열로 설정

//   return (
//     <div className="min-h-screen bg-custom-gradient">
//         <img src={logo} alt="Logo" className="mx-auto h-20" />
      
//         <div className="p-4">
//             <FeedList feeds={feeds} />
//         </div>
//     </div>
//   );
// };

// export default FeedListPage;
