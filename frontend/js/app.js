document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const targetBtns = document.querySelectorAll('.target-btn');
    const convertBtn = document.getElementById('convertBtn');
    const resultSection = document.getElementById('resultSection');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');

    let selectedTarget = null;

    // 수신 대상 버튼 클릭 이벤트
    targetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 모든 버튼 초기화
            targetBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
                b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
            });
            
            // 클릭된 버튼 활성화
            btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
            btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600', 'shadow-md');
            
            selectedTarget = btn.dataset.target;
        });
    });

    // 변환하기 버튼 클릭 이벤트
    convertBtn.addEventListener('click', async () => {
        const text = inputText.value.trim();

        if (!text) {
            alert('변환할 내용을 입력해주세요.');
            return;
        }

        if (!selectedTarget) {
            alert('수신 대상을 선택해주세요.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    target_audience: selectedTarget
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || '변환 중 오류가 발생했습니다.');
            }

            const data = await response.json();
            outputText.value = data.converted_text;
            resultSection.classList.remove('hidden');
            
            // 결과창으로 스크롤
            resultSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    });

    // 복사하기 버튼 클릭 이벤트
    copyBtn.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '복사 완료!';
        
        // Tailwind 클래스 교체
        copyBtn.classList.remove('bg-slate-800', 'hover:bg-slate-900');
        copyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            copyBtn.classList.add('bg-slate-800', 'hover:bg-slate-900');
        }, 2000);
    });

    function setLoading(isLoading) {
        if (isLoading) {
            loadingOverlay.classList.remove('hidden');
            convertBtn.disabled = true;
        } else {
            loadingOverlay.classList.add('hidden');
            convertBtn.disabled = false;
        }
    }
});
