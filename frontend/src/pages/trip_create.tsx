import React from "react";
import styles from "../styles/trip_create.module.css"

// Props 타입 정의 (현재 사용 안 하고 있음)
type Props = {};

const trip_create: React.FC<Props> = () => {
	return (
		<div className={styles.contain}>
			<div className={styles["scroll-view"]}>
				<span className={styles.text} >
					{"여행 만들기"}
				</span>
				<div className={styles.column}>
					<span className={styles.text2} >
						{"여행 제목"}
					</span>
					<div className={styles.view}>
						<span className={styles.text3} >
							{"클릭해 입력해주세요."}
						</span>
					</div>
				</div>
				<div className={styles.column2}>
					<span className={styles.text2} >
						{"여행 날짜"}
					</span>
					<div className={styles.view}>
						<span className={styles.text3} >
							{"선택해주세요."}
						</span>
					</div>
				</div>
				<button className={styles["button-row-view"]}
					onClick={()=>alert("Pressed!")}>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/zmff1f79_expires_30_days.png"} 
						className={styles.image}
                        alt="button-icon"
					/>
					<span className={styles.text4} >
						{"생성하기"}
					</span>
				</button>
			</div>
		</div>
	);
};

export default trip_create;