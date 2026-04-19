import os
import sys
import time

# PPT 자산화 자동화 스크립트 (구름빵님 제작 ☁️)
# 사용법: python convert_pptx.py

def convert_pptx_to_png():
    try:
        import comtypes.client
    except ImportError:
        print("Error: 'comtypes' 라이브러리가 필요합니다. 'pip install comtypes'를 실행해주세요.")
        return

    # 설정 영역
    # ---------------------------------------------------------
    base_path = os.path.dirname(os.path.abspath(__file__))
    input_folder = os.path.join(os.path.dirname(base_path), "PPT_A_Folder")
    output_root = os.path.join(base_path, "assets", "lectures")
    # ---------------------------------------------------------

    if not os.path.exists(output_root):
        os.makedirs(output_root)

    # 모든 하위 폴더 스캔
    for root, dirs, files in os.walk(input_folder):
        for file in files:
            if file.endswith(".pptx") and not file.startswith("~$"):
                pptx_path = os.path.join(root, file)
                
                # 파일명 기반 ID 추출 및 안전한 폴더명 생성
                lecture_id = "".join(x for x in file if x.isalnum() or x in "._- ").strip()
                lecture_id = lecture_id.replace(".pptx", "").replace(" ", "_")
                
                output_folder = os.path.join(output_root, lecture_id)
                if not os.path.exists(output_folder):
                    os.makedirs(output_folder)
                else:
                    # 폴더가 있고 안에 이미 slide.png 들이 있다면 스킵 (빠른 복구용)
                    existing_files = os.listdir(output_folder)
                    if len(existing_files) > 0:
                        print(f"Skipped (already exists): {file}")
                        continue

                print(f"[Run] Converting: {file}...")
                
                try:
                    # 매 파일마다 새로 연결하여 RPC 오류 방지 (가장 안전한 방법)
                    powerpoint = comtypes.client.CreateObject("Powerpoint.Application")
                    # powerpoint.Visible = 1 # 필요 시 주석 해제하여 진행 상황 확인 가능
                    
                    deck = powerpoint.Presentations.Open(pptx_path, ReadOnly=True, WithWindow=False)
                    slide_count = deck.Slides.Count
                    for i in range(1, slide_count + 1):
                        slide = deck.Slides.Item(i)
                        slide_path = os.path.join(output_folder, f"slide{i}.png")
                        slide.Export(slide_path, "PNG")
                    
                    deck.Close()
                    powerpoint.Quit() # 파일 작업 후 안전하게 종료
                    print(f"[OK] Done: {file} ({slide_count} slides)")
                except Exception as e:
                    print(f"[Error] Failed ({file}): {e}")
                    # 오류 발생 시 프로세스가 남지 않도록 시도
                    try: powerpoint.Quit()
                    except: pass
    print("All PPTs converted successfully!")

if __name__ == "__main__":
    convert_pptx_to_png()
