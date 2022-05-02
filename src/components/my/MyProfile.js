import React,{useState} from 'react';
import {Button,Grid,Image,Text} from '../../elements/index';
import {ProfileModal} from './index';
import styled from 'styled-components';

const MyProfile = () => {

    const [isOpen,setIsOpen] =useState(false);
    const openModalHandler=()=>{
        setIsOpen(!isOpen);
    };
    return (
        <React.Fragment>
            <Grid>
                <Grid width="100%" margin="40px 0" height="180px" 
                position="relative" display="flex" flexDirection="column" alignItems="start" justifyContent="center"
                >
                    <Grid width="100%" display="flex" justifyContent="center"  position="relative">
                        <Image type="circle" size="112"/>
                        <Button is_edit position="absolute" top="80px" right="35%" _onClick={openModalHandler}/>
                    </Grid>
                    <Grid width="100%" display="flex" padding="12px 0" justifyContent="center">
                        <Text  size="1.250rem" cursor="pointer">오싹이님</Text>
                    </Grid>
                    <Grid width="100%" display="flex" justifyContent="center">
                        <Text  size="0.85rem" cursor="pointer">alskldskf123@naver.com</Text>
                    </Grid>
                </Grid>
                    {isOpen ? 
                    (<>
                    <ModalBackdrop onClick={openModalHandler}>
                        
                        
                    </ModalBackdrop>
                    <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </>
                    )
                    : null}
            </Grid>
           
           
            
        </React.Fragment>
    );
};
const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  display: flex;
  z-index:2;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;

export default MyProfile;