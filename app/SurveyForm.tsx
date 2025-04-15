"use client";

import { useState, useEffect } from "react";
import { SurveyData } from "./types/survey";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const initialSurveyData: SurveyData = {
  id: "",
  name: "",
  company: "",
  category: "",
  naitei: "",
  schedule:
    "2回生の頃\n1月：\n2月：\n3月：\n3回生\n4月：\n5月：\n6月：\n7月：\n8月：\n9月：\n10月：\n11月：\n12月：\n1月：\n2月：\n3月：\n4回生\n4月：\n5月：\n6月：\n7月：\n8月：\n9月：\n10月：",
  intern: "",
  shaft: "建前\n｜\n本音",
  es: "",
  advice: "",
  message: "",
  contact: "",
};

interface NameOption {
  id: string;
  name: string;
}

export default function SurveyForm() {
  const [formData, setFormData] = useState<SurveyData>(initialSurveyData);
  const [nameOptions, setNameOptions] = useState<NameOption[]>([]);
  const [loading, setLoading] = useState(false);

  // `id.json` を読み込む
  useEffect(() => {
    fetch("/id.json")
      .then((res) => res.json())
      .then((data: NameOption[]) => setNameOptions(data))
      .catch((err) => console.error("Failed to load id.json:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNameChange = (_event: any, value: NameOption | null) => {
    if (value) {
      setFormData({ ...formData, name: value.name, id: value.id });
    } else {
      setFormData({ ...formData, name: "", id: "" });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("無事に保存されました！");
      setFormData(initialSurveyData);
    } else {
      alert("送信失敗、杉下に連絡してね");
    } 
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Stack py={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          就活アンケート
        </Typography>
        <Typography variant="body2" pb={2}>
          ガクチカと就活軸を先に準備しておいてね！
        </Typography>

        {/* 1列目（名前 & ID） */}
        <Stack direction="row" gap={2} mb={2}>
          <TextField
            name="id"
            label="ID"
            value={formData.id}
            disabled
            sx={{ flex: 2 }}
            required
          />
          <Stack sx={{ flex: 8 }}>
            <Autocomplete
              options={nameOptions}
              getOptionLabel={(option) => option.name}
              onChange={handleNameChange}
              renderInput={(params) => (
                <TextField {...params} label="名前を選択してください"/>
              )}
            />
          </Stack>
        </Stack>
        {/* 2列目（就職先） */}
        <Box mb={2}>
          <TextField
            name="company"
            label="就職先"
            fullWidth
            value={formData.company}
            onChange={handleChange}
            placeholder="春から行く会社を入力/非公開の場合は非公開"
            required
          />
        </Box>

        {/* 3列目（業界） */}
        <Box mb={2}>
          <TextField
            name="category"
            label="業界"
            fullWidth
            value={formData.category}
            onChange={handleChange}
            placeholder="例：IT業界、コンサル業界"
            required
          />
        </Box>

        {/* 4列目（スケジュール） */}
        <Typography variant="body2" pb={2} color="error">
          スケジュール注意事項
          <br />
          6月〜9月：ESとか省略してもいいよ
          <br />
          9月から始めた〜とかの場合、それ以前は消してOK
          <br />
          就活終了以降も同様
        </Typography>
        <Box mb={2}>
          <TextField
            name="schedule"
            label="スケジュール"
            fullWidth
            value={formData.schedule}
            onChange={handleChange}
            multiline
            maxRows={25}
            required
          />
        </Box>

        {/* 5列目（インターン先） */}
        <Box mb={2}>
          <TextField
            name="intern"
            label="インターン先"
            fullWidth
            value={formData.intern}
            onChange={handleChange}
            placeholder="今まで行ったインターン先を入力"
            required
          />
        </Box>

        {/* 6列目（就活軸） */}
        <Typography variant="body2" pb={2} color="error">
          ↓注意事項：建前と本音の間にある | ←これ消さないで！
        </Typography>
        <Box mb={2}>
          <TextField
            name="shaft"
            label="就活軸"
            fullWidth
            value={formData.shaft}
            onChange={handleChange}
            multiline
            maxRows={20}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="es"
            label="ES"
            fullWidth
            value={formData.es}
            onChange={handleChange}
            multiline
            maxRows={20}
            placeholder="複数ある場合は一押しを入力"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="advice"
            label="就活でした/しておいたら良かったこと"
            fullWidth
            value={formData.advice}
            onChange={handleChange}
            multiline
            maxRows={20}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="message"
            label="後輩へ一言"
            fullWidth
            value={formData.message}
            onChange={handleChange}
            multiline
            maxRows={20}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="contact"
            label="連絡先（メールアドレス/各種SNS）"
            fullWidth
            value={formData.contact}
            onChange={handleChange}
            rows={4}
            required
          />
        </Box>

        <Box my={2} textAlign="center">
          <LoadingButton variant="contained" color="primary" onClick={handleSubmit} loading={loading}>
            送信
          </LoadingButton>
        </Box>
      </Stack>
    </Container>
  );
}
