import React from 'react';
import s from './Answers.module.css';
import AdminQA from '../adminQA/AdminQA';
import Navbar2 from '../navbar/navBar2';
import Footer from '../Footer/Footer';

export default function Answers() {

    return (
        <div>
            <Navbar2 />
            <div className={s.answerCont}>
                <AdminQA></AdminQA>
            </div>
            <Footer />
        </div>
    );
}