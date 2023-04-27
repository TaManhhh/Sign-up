import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { fetchInforUser } from "../../../redux/reducer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../API/routes";
// import { ACCESS_TOKEN_KEY, APIUrl } from "../../intl/constants";
import { API_PATHS } from "../../../API/api";
import "./profile.css";
import { useLocation } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { generateAvatarUpload } from '../../intl/upload';
import { RESPONSE_STATUS_SUCCESS } from "../../intl/httpResponseCode";
import axios from "axios";
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInforUser(document.cookie.split("=")[1]));
  }, [dispatch]);

  const { avatar, email, gender, name } = useSelector(
    (state: RootState) => state.InforUser
  );
  

 console.log(avatar,"heh")

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<any>(null);
  const [image, setImage] = useState(avatar);
  const [crop, setCrop] = useState<any>({ unit: "%", width: 30, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  
  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);
  
  const handleClose = () => {
    setOpenModal(false);
  };
  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  const uploadAvatar =async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current,completedCrop);
    if (file){
      const formData = new FormData();
      formData.append('file',file,file.name);
      const config ={
        headers :{
          'content-type': 'multipart/form-data',
          // Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put(API_PATHS.userProfile, formData, config);
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        // dispatch(fetchUpdateUser(json.data.data));
      }
    }
  }

 
  return (
    <div
      style={{ display: "flex", textAlign: "center", justifyContent: "center" }}
    >
      <div className="profile-container">
        <div>
          {/* <img className='img' src={`http://api.training.div3.pgtest.co/${user?.avatar}`} alt=''/> */}
          <img src={avatar ? `http://api.training.div3.pgtest.co/${avatar}`: ''} className="img" alt="avatar_url" />
          {location.pathname === ROUTES.profile && (
            <div onClick={changeAvatar}>
              <input
                ref={avatarInputRef}
                hidden
                type="file"
                onChange={onChooseAvatar}
                accept="image/*"
              />
              <span> Upload Avatar</span>
            </div>
          )}
        </div>

        <div style={{ padding: 5 }}>
          <label className="item">{t("email")} :</label>
          {email}
        </div>
        <div style={{ padding: 5 }}>
          <label className="item">{t("name")} :</label>
          {name}
        </div>
        <div style={{ padding: 5 }}>
          <label className="item">{t("gender")} :</label>
          {gender}
        </div>

        {/* <div> {description}</div>
      <div>{region}</div>
      <div>{state}</div> */}
        <button   className="button-profile" type="submit">
          {t("logout")}
        </button>
      </div>

      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Upload</DialogTitle>

        <DialogContent>
          <ReactCrop
            src={image ? image : ""}
            crop={crop}
            onChange={(newCrop: any) => {
              console.log("====================================");
              console.log(newCrop);
              console.log("====================================");
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => {setOpenModal(false);}}>Close</Button>
          <Button onClick={() => {
              setOpenModal(false);uploadAvatar();}}>
            Save Image
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
