import React from "react";
import styles from "./index.module.css";

// Props 타입 정의 (현재 사용 안 하고 있음)
type Props = {};

const MainPage: React.FC<Props> = () => {
	return (
		<div className={styles.contain}>
			<div className={styles["scroll-view"]}>
				<img
					src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/z7fm6bs4_expires_30_days.png" 
					className={styles.image}
					alt="main-banner"
				/>
				<div className={styles["row-view"]}>
					<div className={styles.column}>
						<span className={styles.text}>
							{"함께 만드는 여행의 시작, PlanMate\n지금 바로 여행 보드를 만들고 모두의 여정을 그려보세요."}
						</span>
						<span className={styles.text2}>
							{"보드를 만들고 링크를 공유하면 친구들을 초대할 수 있어요."}
						</span>
						<button
							className={styles["button-row-view"]}
							onClick={() => alert("Pressed!")}
						>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/5g05f0ws_expires_30_days.png"
								className={styles.image2}
								alt="button-icon"
							/>
							<span className={styles.text3}>{"Label"}</span>
						</button>
					</div>
					<img
						src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/j3zws70h_expires_30_days.png"
						className={styles.image3}
						alt="side-banner"
					/>
				</div>
				<div className={styles.column2}>
					<div className={styles["row-view2"]}>
						<div className={styles.column3}>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/dw607loj_expires_30_days.png"
								className={styles.image4}
								alt="feature1"
							/>
							<span className={styles.text4}>{"여행 보드 생성"}</span>
							<span className={styles.text5}>
								{"여행 이름과 날짜만 입력하면 \n나만의 여행 보드가 생성돼요."}
							</span>
						</div>
						<div className={styles.column3}>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/jmf34hgo_expires_30_days.png"
								className={styles.image4}
								alt="feature2"
							/>
							<span className={styles.text4}>{"링크 통해 초대"}</span>
							<span className={styles.text6}>
								{"보드 링크를 친구에게 공유하면 \n회원가입 없이 바로 참여"}
							</span>
						</div>
						<div className={styles.column3}>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/gmlidu8o_expires_30_days.png"
								className={styles.image4}
								alt="feature3"
							/>
							<span className={styles.text4}>{"실시간 계획"}</span>
							<span className={styles.text7}>
								{"일정, 장소, 지도, 채팅까지\n모두가 함께\n실시간으로 여행을 계획해요."}
							</span>
						</div>
					</div>
					<div className={styles["row-view3"]}>
						<div className={styles.column4}>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/8py1zq1c_expires_30_days.png"
								className={styles.image4}
								alt="feature4"
							/>
							<span className={styles.text8}>{"저장"}</span>
							<span className={styles.text9}>
								{"여행 계획은 자동으로 저장되고\n언제든 다시 확인할 수 있어요."}
							</span>
						</div>
						<div className={styles.column5}>
							<img
								src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/o88zx0XLYv/6s0q7baj_expires_30_days.png"
								className={styles.image4}
								alt="feature5"
							/>
							<span className={styles.text8}>{"알림"}</span>
							<span className={styles.text10}>
								{"일정 , 채팅에 관한 알림을\n확인할 수 있어요"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
